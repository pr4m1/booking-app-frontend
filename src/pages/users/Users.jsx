import React from 'react';
import './style-components/Users.css';
import TableUsers from './components/TableUsers';

function Users(){
    return (
        <div className='container-principal-users'>
            <h1>All of the users</h1>
            <TableUsers />
        </div>
    );
}

export default Users;