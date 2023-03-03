import { createContext, useState } from 'react';

export const UserContext = createContext();

export const UserProvider = ({ children }) => {
  const [userCredentials, setUserCredentials] = useState([]);
  //console.log(typeof userCredentials);
  return (
    <UserContext.Provider value={{ userCredentials, setUserCredentials }}>
      {children}
    </UserContext.Provider>
  );
};
