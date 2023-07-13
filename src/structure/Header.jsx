import { useState } from 'react';
import { NavLink } from 'react-router-dom';
import { IconMenu2,IconX } from '@tabler/icons-react';
import '../style-components/Header.css';
import bookLabIcon from '../assets/con_punto-removebg-preview.png';
import { getUser,logout } from '../services/api';

function Header() {
  const [showMenu, setShowMenu] = useState(false);
  const user = getUser();
  const toggleMenu = () => {
    setShowMenu(!showMenu);
  };
  const logoutSession = () =>{
    logout()
      .then()
      .catch();

  }

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
          {user!==null &&
            <>
              <li><NavLink className="link-menu" to='/bookings'>Bookings</NavLink></li>
              {user.role==="ADMIN" &&
                <>
                  <li><NavLink className="link-menu" to='/labs'>Labs</NavLink></li>
                  <li><NavLink className="link-menu" to='/managers'>Managers</NavLink></li>
                  <li><NavLink className="link-menu" to='/users'>Users</NavLink></li>
                </>
              }
            </>
          }
        </ul> 
        <ul className="header-login-register">
          {user===null ?
            <>
              <li><NavLink className={showMenu ? "link-menu" : "link-login"} to='/login'>Log In</NavLink></li>
              <li><NavLink className={showMenu ? "link-menu" : "link-register"} to='/signup'>Sign Up</NavLink></li>
            </>
            : 
              <>
                {!showMenu && <li><p className='welcome-username'>Hello, {user.username}!</p></li>}
                <li><button className={showMenu ? "link-menu" : "link-register"} onClick={logoutSession}>Log Out</button></li>
              </>
          }  
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