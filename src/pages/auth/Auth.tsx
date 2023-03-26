import React from 'react';
import styles from './Auth.module.css';
import AuthCard from '../../components/authCard/AuthCard';

class AuthPage extends React.Component<any, any> {
  render() {
    return (
      <div className={styles.root}>
        <p className={styles.titleLogo}>D-Track</p>
        <AuthCard />
        <p className={styles.textVer}>
          Ver: 0.1.0
          <br />
          Build: 20230225.1
        </p>
      </div>
    );
  }
}

export default AuthPage;
