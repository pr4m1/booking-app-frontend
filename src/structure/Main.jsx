import { Route, Routes,Navigate } from 'react-router-dom';
import Home from '../pages/home/Home';
import Bookings from '../pages/bookings/Bookings';
import Labs from '../pages/labs/Labs';
import Managers from '../pages/manager/Managers';
import '../style-components/Main.css';
import Login from '../pages/auth/Login';
import Signup from '../pages/auth/Signup';
import { getUser } from '../services/api';
import Users from '../pages/users/Users';


function Main(){
    const user = getUser();
    return (
        <main>
            <Routes>
                <Route path='/' element={<Home />} />
                {user!==null ?
                    <>
                        <Route path='/bookings' element={<Bookings />} />
                        {user.role==="ADMIN" &&
                            <>
                                <Route path='/labs' element={<Labs />} />
                                <Route path='/managers' element={<Managers />} />
                                <Route path='/users' element={<Users />} />
                            </>
                        }
                    </>
                    : 
                    <>
                        <Route path='/login' element={<Login />} />
                        <Route path='/signup' element={<Signup />} />
                    </>
                }
                <Route path='*' element={<Navigate to="/"/>} />
            </Routes>
        </main>
    );
}

export default Main;