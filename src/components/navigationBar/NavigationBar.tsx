import React from 'react';
import styles from './NavigationBar.module.css';
import { NavLink } from 'react-router-dom';
import Button from '@mui/material/Button';

export type NavItemData = {
  id: number;
  url: string;
  name: string;
  icon: React.ReactNode;
};

type NavItemProps = {
  children?: React.ReactNode;
  isActive?: boolean;
  isPending?: boolean;
};

function NavItem(props: NavItemProps) {
  const variant = props.isActive ? 'contained' : 'text';

  return (
    <Button className={styles.btnBase} variant={variant} color={'tertiary'}>
      {props.children}
    </Button>
  );
}

type NavigationBarProps = {
  items: NavItemData[];
};

function NavigationBar(props: NavigationBarProps) {
  const items = props.items.map((item) => (
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
