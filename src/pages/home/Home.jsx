import React from 'react';
import { NavLink } from 'react-router-dom';
import './style-components/Home.css';

function Home(){
    return (
        <div className='contenedor-principal-home'>
            <h1>Welcome to BookLab!</h1>
            <p>"Book the lab you need <strong>quickly</strong> and <strong>easily</strong>!</p>
            <NavLink className="link-reserva-home" to='/bookings'><strong>BOOK HERE!</strong></NavLink>
        </div>
    );
}

export default Home;