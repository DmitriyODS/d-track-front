import React, { createContext, useCallback, useContext, useState } from 'react';
import { GetLocalUser } from '../globals/funcs';
import IUserData, { NewEmptyUser } from '../models/user/UserData';

type TUserContext = {
  User: IUserData;
  SetUser?: (user: IUserData) => void;
  ClearUser?: () => void;
};

export const UserContext = createContext<TUserContext>({
  User: NewEmptyUser(),
});

type Props = {
  children?: React.ReactNode;
};

export function useUser() {
  return useContext(UserContext);
}

function UserProvider({ children }: Props) {
  const [user, setUser] = useState(GetLocalUser() ?? NewEmptyUser());

  const clearUserCtx = useCallback(() => {
    setUser(NewEmptyUser());
  }, []);

  const setUserCtx = useCallback((u: IUserData) => {
    setUser(u);
  }, []);

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
