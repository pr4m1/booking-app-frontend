import React from 'react';
import './style-components/Bookings.css';
import TableBookings from './components/TableBookings';
import { BookingContextProvider } from './contexts/useBookingContext';
import FormBooking from './components/FormBooking';

function Bookings(){
    

    return (
        <div className='container-principal-bookings'>
            <h1>Book the lab you want now!</h1>
            <BookingContextProvider>
                <FormBooking />
                <TableBookings />
            </BookingContextProvider>
        </div>

    );
}

export default Bookings;