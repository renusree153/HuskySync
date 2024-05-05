import React, { createContext, useState, useEffect } from 'react';
import { getCurrentUser } from 'aws-amplify/auth';

export const UserContext = createContext();

export const UserProvider = ({ children }) => {
  const [username, setUsername] = useState('default username');
  useEffect(() => {
    const fetchUsername = async () => {
      try {
        const curUser = await getCurrentUser();
        setUsername(curUser.username);
        console.log(curUser);
      } catch (error) {
        console.error("error getting username");
      }
    };
    fetchUsername();
  }, []);

  return (
    <UserContext.Provider value={{ username, setUsername }}>
      {children}
    </UserContext.Provider>
  );
};
