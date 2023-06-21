import React from 'react';
import './style-components/Managers.css';
import FormManager from './components/FormManager';
import { MANAGER_TYPE } from '../../Configuration';
import { DataContextProvider as ManagerContextProvider} from '../../contexts/useDataContext';
import TableManagers from './components/TableManagers';

function Managers(){
    return (
        <div className='container-principal-managers'>
            <h1>ADD A NEW LAB MANAGER</h1>
            <ManagerContextProvider type={MANAGER_TYPE}>
                <FormManager />
                <TableManagers />
            </ManagerContextProvider>
        </div>
    );
}

export default Managers;