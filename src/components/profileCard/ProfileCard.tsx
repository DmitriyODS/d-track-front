import React, { useEffect, useState } from 'react';
import styles from './ProfileCard.module.css';
import Button from '@mui/material/Button';
import Person from '@mui/icons-material/Person';
import Logout from '@mui/icons-material/Logout';
import { useUser } from '../../providers/UserProvider';
import EmployeeData from '../../models/employee/Employee';
import { GetEmployeeByID } from '../../api/employees';
import { enqueueSnackbar } from 'notistack';
import { CircularProgress } from '@mui/material';

type Props = {
  onLogout: () => void;
};

function ProfileCard(props: Props) {
  const user = useUser();
  const [curInfoUser, setInfoUser] = useState<EmployeeData | undefined>();

  useEffect(() => {
    if (user === undefined) {
      return;
    }

    const result = GetEmployeeByID(user?.User.user_id);
    result.then(
      (value) => {
        if (!value.ok) {
          enqueueSnackbar(`Ошибка: ${value.description}`, { variant: 'error' });
          return;
        }

        setInfoUser(value.data);
      },
      () => {
        enqueueSnackbar('Сервер не доступен', { variant: 'error' });
      }
    );
  }, []);

  return (
    <div className={styles.root}>
      <p className={styles.title}>{curInfoUser?.position.value}</p>
      <Button
        variant={'contained'}
        color={'secondary'}
        className={styles.btnProfile}
      >
        <Person className={styles.iconPerson} />
        <p className={styles.labelBtn}>
          {curInfoUser === undefined ? (
            <CircularProgress color="inherit" />
          ) : (
            curInfoUser.fio
          )}
        </p>
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
