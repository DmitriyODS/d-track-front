import React from 'react';
import styles from './NavigationBar.module.css';
import { NavLink } from 'react-router-dom';
import Button from '@mui/material/Button';
import { useUser } from '../../providers/UserProvider';

export type TNavItemData = {
  id: number;
  url: string;
  name: string;
  icon: React.ReactNode;
  sectionPos: number;
};

type TNavItemProps = {
  children?: React.ReactNode;
  isActive?: boolean;
  isPending?: boolean;
};

function NavItem(props: TNavItemProps) {
  const variant = props.isActive ? 'contained' : 'text';

  return (
    <Button className={styles.btnBase} variant={variant} color={'tertiary'}>
      {props.children}
    </Button>
  );
}

type NavigationBarProps = {
  items: TNavItemData[];
};

function NavigationBar(props: NavigationBarProps) {
  const curUser = useUser();
  const levelAccess = curUser.User.levelAccess;
  if (levelAccess === undefined) {
    return <p className={styles.errorAccess}>У вас нет прав на доступ к разделам</p>;
  }
  const viewItems = props.items.filter((it) => ((levelAccess >> it.sectionPos) & 3) > 0);

  const items = viewItems.map((item) => (
    <NavLink to={item.url} key={item.id}>
      {({ isActive, isPending }) => (
        <NavItem isActive={isActive} isPending={isPending}>
          {item.icon}
          <p>{item.name}</p>
        </NavItem>
      )}
    </NavLink>
  ));

  return <div className={styles.root}>{items}</div>;
}

export default NavigationBar;
