import React from 'react';
import styles from './Home.module.css';
import LeftPanel from '../../components/leftPanel/LeftPanel';
import { Navigate, Outlet } from 'react-router-dom';
import AboutDialog from '../../components/aboutDialog/AboutDialog';
import { UserContext } from '../../providers/UserProvider';
import { UrlPages } from '../../globals/urlPages';

type State = {
  isOpenAboutDialog: boolean;
};

class Home extends React.Component<any, State> {
  context!: React.ContextType<typeof UserContext>;

  constructor(props: any) {
    super(props);

    this.state = { isOpenAboutDialog: false };
  }

  onCloseAboutDialogHandler = () => {
    this.setState({ isOpenAboutDialog: false });
  };

  onOpenAboutDialogHandler = () => {
    this.setState({ isOpenAboutDialog: true });
  };

  onLogoutUserHandler = () => {
    this.context?.ClearUser();
  };

  render() {
    return (
      <div className={styles.root}>
        {this.context?.User.UserID === 0 && (
          <Navigate to={UrlPages.Auth} replace />
        )}
        <AboutDialog
          onClose={this.onCloseAboutDialogHandler}
          isOpen={this.state.isOpenAboutDialog}
        />
        <LeftPanel
          onOpenAboutDialogHandler={this.onOpenAboutDialogHandler}
          onLogout={this.onLogoutUserHandler}
        />
        <Outlet />
      </div>
    );
  }
}

Home.contextType = UserContext;

export default Home;
