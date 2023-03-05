import React from 'react';

type TProps = {
  iType: string;
  iSize?: 'x24' | 'x32' | 'x48';
  className?: string;
};

export default function ({ iType, iSize = 'x32', className }: TProps) {
  return (
    <span className={`material-symbols-outlined ${iSize} ${className}`}>
      {iType}
    </span>
  );
}
