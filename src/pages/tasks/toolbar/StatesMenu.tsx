import React from 'react';
import { Divider, Menu, MenuItem } from '@mui/material';
import { TaskStates } from '../../../globals/types';

type TProps = {
  isOpen: boolean;
  anchorEl: HTMLElement | null;
  onChangeState: (newState: TaskStates) => void;
  onClose: () => void;
};

export function StatesMenu(props: TProps) {
  return (
    <Menu anchorEl={props.anchorEl} open={props.isOpen} onClose={props.onClose}>
      <MenuItem onClick={() => props.onChangeState(TaskStates.Open)}>Открыта</MenuItem>
      <MenuItem onClick={() => props.onChangeState(TaskStates.InWork)}>В работе</MenuItem>
      <MenuItem onClick={() => props.onChangeState(TaskStates.Estimation)}>Оценка</MenuItem>
      <Divider />
      <MenuItem onClick={() => props.onChangeState(TaskStates.Close)}>Закрыть</MenuItem>
    </Menu>
  );
}
