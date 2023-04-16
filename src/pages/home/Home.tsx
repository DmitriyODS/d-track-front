import React, { useEffect } from 'react';
import styles from './Home.module.css';
import LeftPanel from '../../components/leftPanel/LeftPanel';
import { Outlet, useLocation, useNavigate } from 'react-router-dom';
import AboutDialog from '../../components/aboutDialog/AboutDialog';
import { UserContext, useUser } from '../../providers/UserProvider';
import { UrlPages } from '../../globals/urlPages';
import { ResetLocalStorage } from '../../globals/funcs';
import EmployeeEdit from '../employees/editDailog/EmployeeEdit';
import { EditModes } from '../../globals/types';

type State = {
  isOpenAboutDialog: boolean;
  isOpenEmployeeDialog: boolean;
};

function ManagerPages() {
  const user = useUser();
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    if (user.User.userId === 0) {
      navigate(UrlPages.Auth, { replace: true });
      return;
    }

    if (location.pathname === '/') {
      navigate(UrlPages.Tasks, { replace: true });
    }
  });

  return null;
}

class Home extends React.Component<any, State> {
  context!: React.ContextType<typeof UserContext>;

  constructor(props: any) {
    super(props);

    this.state = { isOpenAboutDialog: false, isOpenEmployeeDialog: false };
  }

  onCloseAboutDialogHandler = () => {
    this.setState({ isOpenAboutDialog: false });
  };

  onCloseEmployeeDialogHandler = () => {
    this.setState({ isOpenEmployeeDialog: false });
  };

  onOpenAboutDialogHandler = () => {
    this.setState({ isOpenAboutDialog: true });
  };

  onOpenEmployeeDialogHandler = () => {
    this.setState({ isOpenEmployeeDialog: true });
  };

  onLogoutUserHandler = () => {
    this.context.ClearUser?.();
    ResetLocalStorage();
  };

  render() {
    return (
      <div className={styles.root}>
        <ManagerPages />
        {this.state.isOpenEmployeeDialog && (
          <EmployeeEdit
            onClose={this.onCloseEmployeeDialogHandler}
            isOpen={this.state.isOpenEmployeeDialog}
            editMode={EditModes.View}
            selectID={this.context?.User.userId}
          />
        )}
        <AboutDialog
          onClose={this.onCloseAboutDialogHandler}
          isOpen={this.state.isOpenAboutDialog}
        />
        <LeftPanel
          onOpenAboutDialogHandler={this.onOpenAboutDialogHandler}
          onLogout={this.onLogoutUserHandler}
          onOpenUserInfo={this.onOpenEmployeeDialogHandler}
        />
        <Outlet />
      </div>
    );
  }
}

Home.contextType = UserContext;

export default Home;
