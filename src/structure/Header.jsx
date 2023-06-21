import { NavLink } from 'react-router-dom';
import '../style-components/Header.css';
import bookLabIcon from '../assets/con_punto-removebg-preview.png';

function Header(){
    return(
      <header>
        <div id='container-header-left'>
          <NavLink to='/' id='container-logo-titulo'>
            <img src={bookLabIcon} alt='BookLab icon' />
            <h1>BookLab</h1>
          </NavLink>
          <nav className='header-routes'>
            <ul className='header-routes-list'>
              <li><NavLink className='link-menu' to='/bookings'>Bookings</NavLink></li>
              <li><NavLink className='link-menu' to='/labs'>Labs</NavLink></li>
              <li><NavLink className='link-menu' to='/managers'>Managers</NavLink></li>
            </ul>
          </nav>
        </div>
        <div id='container-header-right'>
          <nav className='header-login-register'>
              <NavLink className='link-login' to='/'>Login</NavLink>
              <NavLink className='link-register' to='/'>Register</NavLink>
          </nav>
        </div>
    </header>
    );
}

export default Header;