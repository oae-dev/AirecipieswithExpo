
import { auth } from '@/firebaseConfig';
import { onAuthStateChanged, User } from 'firebase/auth';
import React, { createContext, ReactNode, useContext, useEffect, useState } from 'react';

type UserContexttype ={
    user: User | null;
}

const UserAuthContext = createContext<UserContexttype>({user:null});

export const useUser = () => useContext(UserAuthContext);




export const AuthcontextProvider = ({ children }: { children: ReactNode }) => {

    const [user, setuser] = useState<null | User>(null);
useEffect(() => {
    const loged = onAuthStateChanged(auth,setuser);
    return loged;
  },[]);

  return (
    <UserAuthContext.Provider value={{user}}>
        {children}
    </UserAuthContext.Provider>
  );
};
