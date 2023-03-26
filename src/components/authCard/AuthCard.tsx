import React, { useState } from 'react';
import Paper from '@mui/material/Paper';
import TextField from '@mui/material/TextField';
import styles from './AuthCard.module.css';
import LoginIcon from '@mui/icons-material/Login';
import {
  buttonClasses,
  FormControl,
  IconButton,
  InputAdornment,
  InputLabel,
  OutlinedInput,
} from '@mui/material';
import { Visibility, VisibilityOff } from '@mui/icons-material';
import Button from '@mui/material/Button';

function AuthCard() {
  const [isShowPassword, setShowPassword] = useState(false);
  const [loginText, setLoginText] = useState('');
  const [passText, setPassText] = useState('');

  const handleClickShowPassword = () => setShowPassword((isShow) => !isShow);

  const handleMouseDownPassword = (
    event: React.MouseEvent<HTMLButtonElement>
  ) => {
    event.preventDefault();
  };

  return (
    <Paper className={styles.authCard}>
      <p className={styles.title}>Вход для сотрудников</p>
      <TextField
        id="user-login"
        className={styles.textField}
        fullWidth
        label={'Логин'}
        onChange={(event: React.ChangeEvent<HTMLInputElement>) => {
          setLoginText(event.target.value);
        }}
        value={loginText}
      />
      <FormControl
        className={styles.textField}
        color={'textInput'}
        fullWidth
        variant="outlined"
      >
        <InputLabel htmlFor="user-password">Пароль</InputLabel>
        <OutlinedInput
          id="user-password"
          onChange={(event: React.ChangeEvent<HTMLInputElement>) => {
            setPassText(event.target.value);
          }}
          value={passText}
          type={isShowPassword ? 'text' : 'password'}
          endAdornment={
            passText && (
              <InputAdornment position="end">
                <IconButton
                  aria-label="toggle password visibility"
                  onClick={handleClickShowPassword}
                  onMouseDown={handleMouseDownPassword}
                  edge="end"
                  color={'textInput'}
                >
                  {isShowPassword ? <VisibilityOff /> : <Visibility />}
                </IconButton>
              </InputAdornment>
            )
          }
          label="Пароль"
        />
      </FormControl>
      <Button
        className={styles.textField}
        startIcon={<LoginIcon />}
        variant={'contained'}
        color={'primary'}
        sx={{
          [`& .${buttonClasses.startIcon} > *:nth-of-type(1)`]: {
            fontSize: '32px',
          },
        }}
      >
        Войти
      </Button>
    </Paper>
  );
}

export default AuthCard;
