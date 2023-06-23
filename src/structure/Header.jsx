import { useState } from 'react';
import { NavLink } from 'react-router-dom';
import { IconMenu2,IconX } from '@tabler/icons-react';
import '../style-components/Header.css';
import bookLabIcon from '../assets/con_punto-removebg-preview.png';

function Header() {
  const [showMenu, setShowMenu] = useState(false);
  const toggleMenu = () => {
    setShowMenu(!showMenu);
  };

  const handleResize = () => {
    if(window.innerWidth > 900 && showMenu){
      setShowMenu(false);
    }
  };
  window.addEventListener('resize', handleResize);


  return (
    <header>
      <NavLink to='/' id='container-logo-title'>
        <img src={bookLabIcon} alt='BookLab icon' />
        <h1>BookLab</h1>
      </NavLink>
      <nav className={`header-routes ${showMenu ? 'show' : ''}`}>
        <ul className="header-routes-list">
          <li><NavLink className="link-menu" to='/bookings'>Bookings</NavLink></li>
          <li><NavLink className="link-menu" to='/labs'>Labs</NavLink></li>
          <li><NavLink className="link-menu" to='/managers'>Managers</NavLink></li>
        </ul>
        <ul className="header-login-register">
          <li><NavLink className={showMenu ? "link-menu" : "link-login"} to='/'>Log In</NavLink></li>
          <li><NavLink className={showMenu ? "link-menu" : "link-register"} to='/'>Sign Up</NavLink></li>
        </ul>
      </nav>
      <div className="icon-burger" onClick={toggleMenu}>
          {showMenu?
            <IconX size={30} />
            :
            <IconMenu2 size={30} />}
      </div>
    </header>
  );
}

export default Header;