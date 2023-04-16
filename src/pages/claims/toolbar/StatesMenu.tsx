import React from 'react';
import { Divider, Menu, MenuItem } from '@mui/material';
import { ClaimStates } from '../../../globals/types';

type TProps = {
  isOpen: boolean;
  anchorEl: HTMLElement | null;
  onChangeState: (newState: ClaimStates) => void;
  onClose: () => void;
};

export function StatesMenu(props: TProps) {
  return (
    <Menu anchorEl={props.anchorEl} open={props.isOpen} onClose={props.onClose}>
      <MenuItem onClick={() => props.onChangeState(ClaimStates.Acceptance)}>Приёмка</MenuItem>
      <MenuItem onClick={() => props.onChangeState(ClaimStates.Departure)}>Выезд</MenuItem>
      <MenuItem onClick={() => props.onChangeState(ClaimStates.Repair)}>Ремонт</MenuItem>
      <MenuItem onClick={() => props.onChangeState(ClaimStates.Testing)}>Тестирование</MenuItem>
      <Divider />
      <MenuItem onClick={() => props.onChangeState(ClaimStates.Extradition)}>Выдать</MenuItem>
      <MenuItem onClick={() => props.onChangeState(ClaimStates.Close)}>Закрыть</MenuItem>
    </Menu>
  );
}
