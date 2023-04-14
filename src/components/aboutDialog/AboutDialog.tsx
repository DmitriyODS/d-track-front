import React, { useState } from 'react';
import styles from './AboutDialog.module.css';
import BaseDialog from '../baseDialog/BaseDialog';
import { Typography } from '@mui/material';

type Props = {
  isOpen: boolean;
  onClose: () => void;
};

function AboutDialog(props: Props) {
  return (
    <BaseDialog
      title={'О сервисе'}
      isOpen={props.isOpen}
      onClose={props.onClose}
      className={styles.root}
    >
      <Typography>D-Track - система автоматизированного управления рабочими процессами.</Typography>
      <Typography>Версия: 0.2.0</Typography>
      <Typography>Сборка: 20230414.1</Typography>
      <Typography>Разработчик: IT Компания DDDA</Typography>
    </BaseDialog>
  );
}

export default AboutDialog;
