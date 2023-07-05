import React, { useState } from 'react';
import Table from "../../../components/Table";
import { useDataContext } from "../../../contexts/useDataContext";
import { IconTrash } from '@tabler/icons-react';
import { AlertDelete } from '../../../components/Alert';
import { MANAGER_TYPE } from '../../../Configuration';
import { fetchDeleteData } from '../../../services/api';
import Loader from '../../../components/Loader';

function TableManagers(){
    const {data:managers,stateData,update} = useDataContext();
    const [idDelete,setIdDelete] = useState("");
    const [showAlertDelete,setShowAlertDelete] = useState(false);   
    const columns=["column-auto","column-100","column-90","column-90","column-90","column-55"];
    const heads=["Name","Duration","MaxDay","MaxWeek","MaxTotal","Delete"];
    
    const deleteElement = () => {
        return fetchDeleteData(MANAGER_TYPE,idDelete)
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
                    managers.map(manager => {
                        return(
                            <tr key={manager.id} className="row-body">
                                <td className="column-auto-element">{manager.name}</td>
                                <td>{manager.duration}</td>
                                <td>{manager.numberTimeSlotsDay}</td>
                                <td>{manager.numberTimeSlotsWeek}</td>
                                <td>{manager.numberTimeSlotsTotal}</td>
                                <td>
                                    <IconTrash id="icon-trash" onClick={()=>{setShowAlertDelete(true);setIdDelete(manager.id);}}/>
                                </td>
                            </tr>
                        );
                })}
                {stateData===3 &&  
                    <tr><td colSpan={columns.length}>No managers to show</td></tr>} 
            </Table>
        </>
    );
}

export default TableManagers;