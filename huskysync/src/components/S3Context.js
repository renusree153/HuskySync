import React, {createContext, useState} from 'react';
import { useContext } from 'react';

const S3Context = createContext();

export const S3Provider = ({ children }) => {
    const [s3ObjectID, setS3ObjectID] = useState(null);
    return (
      <S3Context.Provider value={{ s3ObjectID, setS3ObjectID }}>
        {children}
      </S3Context.Provider>
    );
};
  
export default S3Context;