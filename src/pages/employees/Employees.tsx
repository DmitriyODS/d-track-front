import React from 'react';
import styles from './Employees.module.css';
import { Typography } from '@mui/material';
import SearchField from '../../components/searchField/SearchField';
import EmployeesToolbar from './toolbar/Toolbar';
import Switcher from '../../components/switcher/Switcher';

type State = {
  isArchive: boolean;
};

class Employee extends React.Component<any, State> {
  constructor(props: any) {
    super(props);

    // todo: временная заглушка до ReduxToolkit
    this.state = { isArchive: false };
  }

  handleSwitchToArchive = () => {
    this.setState({ isArchive: true });
  };

  handleSwitchToMain = () => {
    this.setState({ isArchive: false });
  };

  render() {
    return (
      <div className={styles.root}>
        <div className={styles.header}>
          <Typography variant={'h1'}>Сотрудники</Typography>
          <SearchField placeholder={'Фильтрация по ФИО сотрудника'} />
        </div>
        <div className={styles.toolbar}>
          <EmployeesToolbar isArchive={this.state.isArchive} />
          <Switcher
            isArchive={this.state.isArchive}
            onClickOne={this.handleSwitchToMain}
            onClickTwo={this.handleSwitchToArchive}
            textOne={'Штат'}
            textTwo={'Уволенные'}
          />
        </div>
        <div className={styles.content}></div>
      </div>
    );
  }
}

export default Employee;
