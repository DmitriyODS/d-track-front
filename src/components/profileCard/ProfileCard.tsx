import React, { useEffect, useState } from 'react';
import styles from './ProfileCard.module.css';
import Button from '@mui/material/Button';
import Person from '@mui/icons-material/Person';
import Logout from '@mui/icons-material/Logout';
import { useUser } from '../../providers/UserProvider';
import IEmployeeData from '../../models/employee/EmployeeData';
import { GetEmployeeByID } from '../../api/employee/methods';
import { enqueueSnackbar } from 'notistack';
import { CircularProgress } from '@mui/material';

type Props = {
  onLogout: () => void;
  onOpenUserInfo: () => void;
};

function ProfileCard(props: Props) {
  const user = useUser();
  const [curInfoUser, setInfoUser] = useState<IEmployeeData | undefined>();

  useEffect(() => {
    const result = GetEmployeeByID(user.User.userId);
    result.then(
      (employee) => {
        setInfoUser(employee);
      },
      (error: string) => {
        enqueueSnackbar(error, { variant: 'error' });
      }
    );
  }, []);

  return (
    <div className={styles.root}>
      <p className={styles.title}>{curInfoUser?.position.value}</p>
      <Button variant={'contained'} color={'secondary'} className={styles.btnProfile} onClick={props.onOpenUserInfo}>
        <Person className={styles.iconPerson} />
        <p className={styles.labelBtn}>{curInfoUser?.fio ?? <CircularProgress color="inherit" />}</p>
      </Button>
      <Button variant={'contained'} color={'secondaryInvert'} className={styles.btnProfile} onClick={props.onLogout}>
        <Logout className={styles.iconLogout} />
        <p className={styles.labelBtn}>Выйти из системы</p>
      </Button>
    </div>
  );
}

export default ProfileCard;
