import React from 'react';
import styles from './ProfileCard.module.css';
import Button from '@mui/material/Button';
import Person from '@mui/icons-material/Person';
import Logout from '@mui/icons-material/Logout';
import { useUser } from '../../providers/UserProvider';

type Props = {
  onLogout: () => void;
};

function ProfileCard(props: Props) {
  const user = useUser();

  return (
    <div className={styles.root}>
      <p className={styles.title}>{user?.User.login}</p>
      <Button
        variant={'contained'}
        color={'secondary'}
        className={styles.btnProfile}
      >
        <Person className={styles.iconPerson} />
        <p className={styles.labelBtn}>{user?.User.login}</p>
      </Button>
      <Button
        variant={'contained'}
        color={'secondaryInvert'}
        className={styles.btnProfile}
        onClick={props.onLogout}
      >
        <Logout className={styles.iconLogout} />
        <p className={styles.labelBtn}>Выйти из системы</p>
      </Button>
    </div>
  );
}

export default ProfileCard;
