import React from 'react';
import styles from './LeftPanel.module.css';
import Paper from '@mui/material/Paper';
import ProfileCard from '../profileCard/ProfileCard';
import Button from '@mui/material/Button';
import Info from '@mui/icons-material/InfoOutlined';
import NavigationBar, { NavItemData } from '../navigationBar/NavigationBar';
import { UrlPages } from '../../globals/urlPages';
import IconClaims from '@mui/icons-material/ReceiptLong';
import IconProcessesClaims from '@mui/icons-material/Timeline';
import IconTasks from '@mui/icons-material/TaskOutlined';
import IconTaskBoard from '@mui/icons-material/DashboardOutlined';
import IconCustomers from '@mui/icons-material/PeopleOutline';
import IconEmployees from '@mui/icons-material/BadgeOutlined';

type Props = {
  onOpenAboutDialogHandler: () => void;
  onLogout: () => void;
  onOpenUserInfo: () => void;
};

function LeftPanel(props: Props) {
  const navItems: NavItemData[] = [
    {
      id: 1,
      url: UrlPages.Claims,
      name: 'Заявки',
      icon: <IconClaims />,
    },
    {
      id: 2,
      url: UrlPages.ProcessesClaims,
      name: 'Процессы заявок',
      icon: <IconProcessesClaims />,
    },
    {
      id: 3,
      url: UrlPages.Tasks,
      name: 'Задачи',
      icon: <IconTasks />,
    },
    {
      id: 4,
      url: UrlPages.TaskBoard,
      name: 'Доска задач',
      icon: <IconTaskBoard />,
    },
    {
      id: 5,
      url: UrlPages.Customers,
      name: 'Клиенты',
      icon: <IconCustomers />,
    },
    {
      id: 6,
      url: UrlPages.Employees,
      name: 'Сотрудники',
      icon: <IconEmployees />,
    },
  ];

  return (
    <Paper className={styles.root}>
      <p className={styles.title}>D-Track</p>
      <ProfileCard
        onLogout={props.onLogout}
        onOpenUserInfo={props.onOpenUserInfo}
      />
      <NavigationBar items={navItems} />
      <Button
        variant={'contained'}
        color={'secondaryInvert'}
        className={styles.btnAbout}
        onClick={props.onOpenAboutDialogHandler}
      >
        <Info className={styles.iconAbout} />О сервисе
      </Button>
    </Paper>
  );
}

export default LeftPanel;
