import React from 'react';
import styles from './Home.module.css';
import LeftPanel from '../../components/leftPanel/LeftPanel';
import { Outlet } from 'react-router-dom';

class Home extends React.Component<any, any> {
  render() {
    return (
      <div className={styles.root}>
        <LeftPanel />
        <Outlet />
      </div>
    );
  }
}

export default Home;
