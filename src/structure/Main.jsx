import { Route, Routes,Navigate } from 'react-router-dom';
import Home from '../pages/home/Home';
import Bookings from '../pages/bookings/Bookings';
import Labs from '../pages/labs/Labs';
import Managers from '../pages/manager/Managers';
import '../style-components/Main.css';


function Main(){
    return (
        <main>
            <Routes>
                <Route path='/' element={<Home />} />
                <Route path='/bookings' element={<Bookings />} />
                <Route path='/labs' element={<Labs />} />
                <Route path='/managers' element={<Managers />} />
                <Route path='*' element={<Navigate to="/"/>} />
            </Routes>
        </main>
    );
}

export default Main;