import React, { createContext, useContext, useState } from 'react';
import { PendingStatuses } from '../globals/types';

type PendingDispatch = {
  ToPending: () => void;
  ToReady: () => void;
};

type Props = {
  children?: React.ReactNode;
};

export const PendingContext = createContext<PendingStatuses>(
  PendingStatuses.Ready
);

export const PendingDispatchContext = createContext<PendingDispatch>({
  ToPending: () => {},
  ToReady: () => {},
});

export function usePending() {
  return useContext(PendingContext);
}

export function usePendingDispatch() {
  return useContext(PendingDispatchContext);
}

function PendingProvider({ children }: Props) {
  const [pending, setPending] = useState(PendingStatuses.Ready);

  const toPending = () => {
    setPending(PendingStatuses.Loading);
  };

  const toReady = () => {
    setPending(PendingStatuses.Ready);
  };

  return (
    <PendingContext.Provider value={pending}>
      <PendingDispatchContext.Provider
        value={{ ToPending: toPending, ToReady: toReady }}
      >
        {children}
      </PendingDispatchContext.Provider>
    </PendingContext.Provider>
  );
}

export default PendingProvider;
