import React, { useState } from "react";
import Table from "../../../components/Table";
import { useBookingContext } from "../contexts/useBookingContext";
import { fetchDeleteData } from "../../../services/api";
import { AlertDelete } from '../../../components/Alert';
import { IconTrash } from '@tabler/icons-react';
import { BOOKING_TYPE } from "../../../Configuration";
import Loader from '../../../components/Loader';
import moment from "moment";
import "moment-timezone";

function TableBookingsAdmin( ){
    const {timeZone,bookings,stateData,updateTable} = useBookingContext();
    const [showAlertDelete,setShowAlertDelete] = useState(false);
    const [idDelete,setIdDelete] = useState("");
    const columns=["column-auto","column-100","column-auto","column-100","column-55"];
    const heads=["User","Date","Lab","Hour","Delete"];

    const deleteElement = () => {
        return fetchDeleteData(BOOKING_TYPE,idDelete)
            .then(()=>updateTable())
            .catch(err => {throw err;})
    }    
    return (
        <>
            {showAlertDelete && <AlertDelete close={()=>setShowAlertDelete(false)} deleteElement={deleteElement}/>}
            <Table columns={columns} heads={heads}>
                {stateData===0 && 
                    <tr><td colSpan={columns.length}><div className="block-loading"><Loader /></div></td></tr>}
                {stateData===1 && 
                    <tr><td colSpan={columns.length} className="block-error">ERROR DE RED</td></tr>}
                {stateData===2 &&  
                    bookings.map(booking => {
                        return(
                                <tr key={booking.id} className="row-body">
                                    <td className="column-auto-element">{booking.username}</td>
                                    <td>{moment.utc(booking.date).tz(timeZone).format('DD/MM/yyyy')}</td>
                                    <td className="column-auto-element">{booking.lab.name}</td>
                                    <td>{moment.utc(booking.date).tz(timeZone).format('HH:mm')}</td>
                                    <td>
                                        <IconTrash id="icon-trash" onClick={()=>{setShowAlertDelete(true);setIdDelete(booking.id);}}/>
                                    </td>
                                </tr>
                            );
                })}
                {stateData===3 &&  
                    <tr><td colSpan={columns.length}>No bookings to show</td></tr>} 
            </Table>    
        </>
    );
}

export default TableBookingsAdmin;