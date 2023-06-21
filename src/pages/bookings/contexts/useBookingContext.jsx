import React, { createContext, useContext } from 'react';
import useDataFormBooking from '../hooks/useDataFormBooking';

const bookingContext = createContext();


export function useBookingContext() {
  return useContext(bookingContext);
}

export function BookingContextProvider({ children }) {
    const {...contextValue }  = useDataFormBooking();
    return (
        <bookingContext.Provider value={ contextValue}>
        {children}
        </bookingContext.Provider>
    );
}