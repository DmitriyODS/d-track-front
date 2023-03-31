import React, { createContext, useContext, useState } from 'react';
import { PendingStatuses } from '../globals/types';

type TPendingContext = {
  Status: PendingStatuses;
  ToPending: () => void;
  ToReady: () => void;
};

type Props = {
  children?: React.ReactNode;
};

export const PendingContext = createContext<TPendingContext | undefined>(
  undefined
);

export function usePending() {
  return useContext(PendingContext);
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
    <PendingContext.Provider
      value={{ Status: pending, ToPending: toPending, ToReady: toReady }}
    >
      {children}
    </PendingContext.Provider>
  );
}

export default PendingProvider;
