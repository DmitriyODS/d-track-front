import React from 'react';
import styles from './Button.module.css';
import Icon from '../icon/Icon';

type TProps = {
  type?: 'elevated' | 'filled' | 'tonal' | 'outlined' | 'text';
  icon?: string;
  children?: any;
  onClick?: React.MouseEventHandler;
  color: 'primary' | 'tertiary' | 'secondary';
  disabled?: boolean;
};

export function Button(props: TProps) {
  let disabledStyle = '';
  if (props.disabled) {
    disabledStyle = 'btnDisabled';
  }

  return (
    <div
      className={`${styles.ButtonFilled} ${styles[props.color]} ${
        styles[disabledStyle]
      }`}
      onClick={props.disabled ? undefined : props.onClick}
      tabIndex={0}
    >
      {props.icon && (
        <Icon className={styles.ButtonIconMR} iType={props.icon} />
      )}
      <span>{props.children}</span>
    </div>
  );
}
