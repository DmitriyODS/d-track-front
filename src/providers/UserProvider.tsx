import React, { createContext, useContext, useState } from 'react';
import User, { CreateEmptyUser } from '../models/user/User';

type TUserContext = {
  User: User;
  SetUser: (user: User) => void;
  ClearUser: () => void;
};

export const UserContext = createContext<TUserContext | undefined>(undefined);

type Props = {
  children?: React.ReactNode;
};

export function useUser() {
  return useContext(UserContext);
}

function UserProvider({ children }: Props) {
  const [user, setUser] = useState(CreateEmptyUser());

  const clearUserCtx = () => {
    setUser(CreateEmptyUser());
  };

  const setUserCtx = (u: User) => {
    setUser(u);
  };

  return (
    <UserContext.Provider
      value={{
        User: user,
        SetUser: setUserCtx,
        ClearUser: clearUserCtx,
      }}
    >
      {children}
    </UserContext.Provider>
  );
}

export default UserProvider;
