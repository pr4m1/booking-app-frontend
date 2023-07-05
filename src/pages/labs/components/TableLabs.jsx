import React, { useState } from 'react';
import Table from "../../../components/Table";
import { useDataContext } from "../../../contexts/useDataContext";
import { IconTrash } from '@tabler/icons-react';
import { AlertDelete } from '../../../components/Alert';
import { LAB_TYPE } from '../../../Configuration';
import { fetchDeleteData } from '../../../services/api';
import Loader from '../../../components/Loader';

function TableLabs(){
    const {data:labs,stateData,update} = useDataContext();
    const [idDelete,setIdDelete] = useState("");
    const [showAlertDelete,setShowAlertDelete] = useState(false);   
    const columns=["column-auto","column-auto","column-55"];
    const heads=["Name","Manager","Delete"];
    
    const deleteElement = () => {
        return fetchDeleteData(LAB_TYPE,idDelete)
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
                    labs.map(lab => {
                        return(
                            <tr key={lab.id} className="row-body">
                                <td className="column-auto-element">{lab.name}</td>
                                <td className="column-auto-element">{lab.manager.name}</td>
                                <td>
                                    <IconTrash id="icon-trash" onClick={()=>{setShowAlertDelete(true);setIdDelete(lab.id);}}/>
                                </td>
                            </tr>
                        );
                })}
                {stateData===3 &&  
                    <tr><td colSpan={columns.length}>No labs to show</td></tr>} 
            </Table>
        </>
    );
}

export default TableLabs;