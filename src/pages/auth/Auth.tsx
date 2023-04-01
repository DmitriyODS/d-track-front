import React from 'react';
import styles from './Auth.module.css';
import AuthCard from '../../components/authCard/AuthCard';
import { UserContext } from '../../providers/UserProvider';
import { Navigate } from 'react-router-dom';
import { SetJWTToLocalStorage } from '../../globals/funcs';
import { enqueueSnackbar } from 'notistack';
import { Login } from '../../api/auth/methods';
import { NewLoginUser } from '../../models/user/UserData';

type State = {
  isLoading: boolean;
};

class AuthPage extends React.Component<any, State> {
  context!: React.ContextType<typeof UserContext>;

  constructor(props: any) {
    super(props);

    this.state = { isLoading: false };
  }

  onLoginHandler = (login: string, password: string) => {
    this.setState({ isLoading: true });

    const setUser = this.context.SetUser;
    const result = Login(NewLoginUser(login, password));

    result.then(
      (u) => {
        setUser?.(u);
        SetJWTToLocalStorage(u.jwt);
      },
      (error: string) => enqueueSnackbar(error, { variant: 'error' })
    );

    result.finally(() => {
      this.setState({ isLoading: false });
    });
  };

  render() {
    return (
      <div className={styles.root}>
        {!!this.context?.User.userId && <Navigate to={'/'} replace={true} />}
        <p className={styles.titleLogo}>D-Track</p>
        <AuthCard onLogin={this.onLoginHandler} isInactive={this.state.isLoading} />
        <p className={styles.textVer}>
          Ver: 0.1.0
          <br />
          Build: 20230225.1
        </p>
      </div>
    );
  }
}

AuthPage.contextType = UserContext;

export default AuthPage;
