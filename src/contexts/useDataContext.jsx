import React, { createContext, useContext } from 'react';
import useData from '../hooks/useData';

const dataContext = createContext();


export function useDataContext() {
  return useContext(dataContext);
}


export function DataContextProvider({ children,type }) {
    const {...value} = useData(type);

    return (
        <dataContext.Provider value={value}>
        {children}
        </dataContext.Provider>
    );
}