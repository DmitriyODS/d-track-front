import React from 'react';
import styles from './BaseDialog.module.css';
import {
  Breakpoint,
  Dialog,
  DialogContent,
  DialogTitle,
  IconButton,
} from '@mui/material';
import IconClose from '@mui/icons-material/Close';

type Props = {
  onClose: (e?: any, r?: any) => void;
  isOpen: boolean;
  title: string;
  className?: string;
  children?: React.ReactNode;
  disableEscapeKeyDown?: boolean;
  maxWidth?: Breakpoint;
};

function BaseDialog(props: Props) {
  return (
    <Dialog
      className={styles.root}
      open={props.isOpen}
      disableEscapeKeyDown={props.disableEscapeKeyDown}
      onClose={props.onClose}
      maxWidth={props.maxWidth}
    >
      <DialogTitle className={styles.header}>
        {props.title}
        <IconButton
          aria-label="close"
          onClick={props.onClose}
          className={styles.icon}
        >
          <IconClose />
        </IconButton>
      </DialogTitle>
      <DialogContent className={props.className}>
        {props.children}
      </DialogContent>
    </Dialog>
  );
}

export default BaseDialog;
