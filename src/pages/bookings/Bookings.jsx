import React from 'react';
import './style-components/Bookings.css';
import TableBookings from './components/TableBookings';
import TableBookingsAdmin from './components/TableBookingsAdmin';
import { BookingContextProvider } from './contexts/useBookingContext';
import FormBooking from './components/FormBooking';
import { getUser } from '../../services/api';

function Bookings(){
    const user = getUser();

    return (
        <div className='container-principal-bookings'>
            <h1>Book the lab you want now!</h1>
            <BookingContextProvider>
                <FormBooking />
                {user.role==="ADMIN" ?
                    <TableBookingsAdmin />
                :
                    <TableBookings />
                }
            </BookingContextProvider>
        </div>

    );
}

export default Bookings;