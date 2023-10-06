import React, { useState } from 'react';
import Table from "../../../components/Table";
import useData from '../../../hooks/useData';
import { IconTrash } from '@tabler/icons-react';
import { AlertDelete } from '../../../components/Alert';
import { USER_TYPE,USER_TYPE_ALL } from '../../../Configuration';
import { fetchDeleteData, getUser } from '../../../services/api';
import Loader from '../../../components/Loader';

function TableUsers(){
    const {data: users, stateData, update} = useData(USER_TYPE_ALL);
    const [idDelete,setIdDelete] = useState("");
    const [showAlertDelete,setShowAlertDelete] = useState(false);   
    const columns=["column-auto","column-55"];
    const heads=["Username","Delete"];
    const userAdmin = getUser();
    const deleteElement = () => {
        return fetchDeleteData(USER_TYPE,idDelete)
            .then(()=>update())
            .catch(err => {throw err;})
    }
    
    return(
        <>
            {showAlertDelete && <AlertDelete close={()=>setShowAlertDelete(false)} deleteElement={deleteElement}/>}
            <Table columns={columns} heads={heads}>
                {stateData===0 && 
                    <tr><td colSpan={columns.length}><div className="block-loading"><Loader /></div></td></tr>}
                {stateData===1 && 
                    <tr><td colSpan={columns.length} className="block-error">ERROR DE RED</td></tr>}
                {stateData===2 &&  
                    users.map(user => {
                        return(
                            <tr key={user.id} className="row-body">
                                <td className="column-auto-element">{user.username}</td>
                                <td>
                                    {user.username!==userAdmin.username && <IconTrash id="icon-trash" onClick={()=>{setShowAlertDelete(true);setIdDelete(user.id);}}/>}
                                </td>
                            </tr>
                        );
                })}
                {stateData===3 &&  
                    <tr><td colSpan={columns.length}>No users to show</td></tr>} 
            </Table>
        </>
    );
}

export default TableUsers;