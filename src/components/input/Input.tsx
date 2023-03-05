import React, { useState } from 'react';
import styles from './Input.module.css';
import Icon from '../icon/Icon';

type TProps = {
  className?: string;
  hint?: string;
  disabled?: boolean;
  type?: string;
  name?: string;
  value?: string;
  onChange?: React.ChangeEventHandler<HTMLInputElement>;
  invalid?: boolean;
};
export default function (props: TProps) {
  const [isShowPass, setShowPass] = useState(false);

  let validClass = '';
  if (props.invalid) {
    validClass = 'invalidField';
  }

  const onShowPass = () => {
    setShowPass((curState) => !curState);
  };

  let btnShowPass;
  if (props.type == 'password') {
    btnShowPass = (
      <span className={styles.btnShowPassword} onClick={onShowPass}>
        <Icon
          iType={isShowPass ? 'visibility_off' : 'visibility'}
          iSize="x24"
        />
      </span>
    );
  }

  return (
    <div className={styles.BaseContainer}>
      <input
        type={isShowPass ? 'text' : props.type}
        className={`${styles.BaseInput} ${props.className} ${styles[validClass]}`}
        disabled={props.disabled}
        name={props.name}
        placeholder={props.hint}
        value={props.value}
        onChange={props.onChange}
      />
      {btnShowPass}
      <label className={styles.BaseLabel} htmlFor={props.name}>
        {props.hint}
      </label>
    </div>
  );
}
