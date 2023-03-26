import React from 'react';
import styles from './ProfileCard.module.css';
import Button from '@mui/material/Button';
import Person from '@mui/icons-material/Person';
import Logout from '@mui/icons-material/Logout';

type ProfileCardProps = {
  typeUser: string;
  userName: string;
};

function ProfileCard(props: ProfileCardProps) {
  return (
    <div className={styles.root}>
      <p className={styles.title}>{props.typeUser}</p>
      <Button
        variant={'contained'}
        color={'secondary'}
        className={styles.btnProfile}
      >
        <Person className={styles.iconPerson} />
        {props.userName}
      </Button>
      <Button
        variant={'contained'}
        color={'secondaryInvert'}
        className={styles.btnProfile}
      >
        <Logout className={styles.iconLogout} />
        Выйти из системы
      </Button>
    </div>
  );
}

export default ProfileCard;
