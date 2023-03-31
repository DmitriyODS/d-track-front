import React from 'react';
import styles from './Auth.module.css';
import AuthCard from '../../components/authCard/AuthCard';
import { UserContext } from '../../providers/UserProvider';
import { LoginUser } from '../../api/auth';
import { Navigate } from 'react-router-dom';
import { SetJWTToLocalStorage } from '../../globals/funcs';
import { enqueueSnackbar } from 'notistack';

type State = {
  isLoading: boolean;
};

class AuthPage extends React.Component<any, State> {
  context!: React.ContextType<typeof UserContext>;

  constructor(props: any) {
    super(props);

    this.state = { isLoading: false };
  }

  handlerOnLogin = (login: string, password: string) => {
    this.setState({ isLoading: true });
    const result = LoginUser(login, password);
    const setUser = this.context?.SetUser;

    result.then(
      (res) => {
        if (!res.ok) {
          enqueueSnackbar(`Ошибка: ${res.description}`, { variant: 'error' });
          return;
        }

        setUser?.(res.data!);
        SetJWTToLocalStorage(res.data!.jwt);
      },
      () => {
        enqueueSnackbar('Сервер не доступен', { variant: 'error' });
      }
    );

    result.finally(() => {
      this.setState({ isLoading: false });
    });
  };

  render() {
    return (
      <div className={styles.root}>
        {this.context?.User.user_id !== 0 && (
          <Navigate to={'/'} replace={true} />
        )}
        <p className={styles.titleLogo}>D-Track</p>
        <AuthCard
          onLogin={this.handlerOnLogin}
          isInactive={this.state.isLoading}
        />
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
