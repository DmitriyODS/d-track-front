import React from 'react';
import styles from './Home.module.css';
import LeftPanel from '../../components/leftPanel/LeftPanel';
import { Outlet } from 'react-router-dom';
import AboutDialog from '../../components/aboutDialog/AboutDialog';

type State = {
  isOpenAboutDialog: boolean;
};

class Home extends React.Component<any, State> {
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

  render() {
    return (
      <div className={styles.root}>
        <AboutDialog
          onClose={this.onCloseAboutDialogHandler}
          isOpen={this.state.isOpenAboutDialog}
        />
        <LeftPanel onOpenAboutDialogHandler={this.onOpenAboutDialogHandler} />
        <Outlet />
      </div>
    );
  }
}

export default Home;
