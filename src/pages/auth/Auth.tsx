import React from 'react';
import styles from './Auth.module.css';
import { Button } from '../../components/button/Button';
import Input from '../../components/input/Input';

class AuthPage extends React.Component<any, any> {
  render() {
    return (
      <div className={styles.BaseContainer}>
        <div className={styles.BaseLogo}>D-Track</div>
        <div className={styles.BaseInfoApp}>
          Ver: 0.1.0
          <br />
          Build: 20230225.1
        </div>
        <div className={styles.AuthCard}>
          <div className={styles.AuthCardTitle}>
            Вход <br />
            сотрудника
          </div>
          <Input hint="Логин" className={styles.InputField} />
          <Input type="password" hint="Пароль" className={styles.InputField} />
          <Button color="primary" icon="login">
            Войти
          </Button>
        </div>
      </div>
    );
  }
}

export default AuthPage;
