import React, { createContext, useContext, useState } from 'react';

const S3ObjsContext = createContext();

export const useS3Objs = () => useContext(S3ObjsContext);

export const S3ObjsProvider = ({ children }) => {
    const [s3Objs, setS3Objs] = useState([]);
    return (
        <S3ObjsContext.Provider value={{ s3Objs, setS3Objs }}>
            {children}
        </S3ObjsContext.Provider>
    );
};