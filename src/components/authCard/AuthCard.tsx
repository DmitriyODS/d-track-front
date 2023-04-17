import React, { FormEvent, useRef, useState } from 'react';
import Paper from '@mui/material/Paper';
import TextField from '@mui/material/TextField';
import styles from './AuthCard.module.css';
import LoginIcon from '@mui/icons-material/Login';
import {
  Backdrop,
  buttonClasses,
  CircularProgress,
  FormControl,
  FormHelperText,
  IconButton,
  InputAdornment,
  InputLabel,
  OutlinedInput,
} from '@mui/material';
import { Visibility, VisibilityOff } from '@mui/icons-material';
import Button from '@mui/material/Button';

type Props = {
  onLogin: (login: string, password: string) => void;
  isInactive: boolean;
  isError?: boolean;
};

function AuthCard(props: Props) {
  const [isShowPassword, setShowPassword] = useState(false);
  const [loginText, setLoginText] = useState('');
  const [passText, setPassText] = useState('');
  const inputRef = useRef<HTMLInputElement>(null);

  const [loginError, setLoginError] = useState({
    isError: false,
    errorText: '',
  });
  const [passwordError, setPasswordError] = useState({
    isError: false,
    errorText: '',
  });

  const handleClickShowPassword = () => setShowPassword((isShow) => !isShow);

  const handleMouseDownPassword = (event: React.MouseEvent<HTMLButtonElement>) => {
    event.preventDefault();
  };

  const onValidateAndSubmit = (e: FormEvent) => {
    e.preventDefault();

    if (loginText === '') {
      setLoginError({ isError: true, errorText: 'Поле не может быть пустым' });
      return;
    } else {
      setLoginError({ isError: false, errorText: '' });
    }

    if (passText === '') {
      setPasswordError({
        isError: true,
        errorText: 'Поле не может быть пустым',
      });
      return;
    } else {
      setPasswordError({ isError: false, errorText: '' });
    }

    props.onLogin(loginText, passText);
  };

  return (
    <>
      <Backdrop open={props.isInactive} sx={{ zIndex: (theme) => theme.zIndex.drawer + 1 }}>
        <CircularProgress color="inherit" />
      </Backdrop>
      <Paper className={styles.authCard}>
        <p className={styles.title}>Вход для сотрудников</p>
        <form className={styles.form} onSubmit={onValidateAndSubmit}>
          <TextField
            id="user-login"
            className={styles.textField}
            autoFocus
            fullWidth
            label={'Логин'}
            onChange={(event: React.ChangeEvent<HTMLInputElement>) => {
              setLoginText(event.target.value);
            }}
            value={loginText}
            disabled={props.isInactive}
            error={loginError.isError}
            helperText={loginError.isError && loginError.errorText}
            autoComplete={'off'}
            onKeyDown={(e) => {
              if (e.key === 'Enter') {
                inputRef.current?.focus();
              }
            }}
          />
          <FormControl
            className={styles.textField}
            color={'textInput'}
            fullWidth
            variant="outlined"
            disabled={props.isInactive}
            error={passwordError.isError}
          >
            <InputLabel htmlFor="user-password">Пароль</InputLabel>
            <OutlinedInput
              inputRef={inputRef}
              autoComplete={'off'}
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
            <FormHelperText id="user-password">{passwordError.errorText}</FormHelperText>
          </FormControl>
          <Button
            type={'submit'}
            className={styles.textField}
            startIcon={<LoginIcon />}
            variant={'contained'}
            color={'primary'}
            disabled={props.isInactive}
            sx={{
              [`& .${buttonClasses.startIcon} > *:nth-of-type(1)`]: {
                fontSize: '32px',
              },
            }}
          >
            Войти
          </Button>
        </form>
      </Paper>
    </>
  );
}

export default AuthCard;
