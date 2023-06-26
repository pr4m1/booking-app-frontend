import React, {useState} from "react";
import { BOOKING_TYPE } from "../../../Configuration";
import moment from 'moment';
import { fetchAddData } from "../../../services/api";
import { Alert } from "../../../components/Alert";
import { useBookingContext } from "../contexts/useBookingContext";


function AddNewBooking(){
    const { valueDateTime, labSelected,updateTable,notTimeOptionsAvailableToSelect,timeZone }=useBookingContext();
    const [alert,setAlert] = useState("");

    function checkDate () {
        return moment().tz(timeZone).isBefore(valueDateTime)? true:false;
    }

    const submitBooking = () => {
        if(!labSelected){
            setAlert("No labs availables!");
        }else if(!checkDate()){
            setAlert("Not valid date!");
        }else if(notTimeOptionsAvailableToSelect()){
            setAlert("Time not selected!");
        }else{
            let bookingNew={
                date: valueDateTime.clone().tz('Etc/UTC').format("yyyy-MM-DDTHH:mm:ss"),
                lab: {id: labSelected.id}
            };
            fetchAddData(BOOKING_TYPE,bookingNew)
                .then(()=>{
                    setAlert("Booking added!");
                    updateTable();
                })
                .catch((error) => {
                    if (error?.message) {
                        setAlert(error.message);
                    }else{
                        setAlert("Problem adding booking!")
                    }
                });
        }
    }
    return(
        <div className="form-container-submit">
            {alert.length>0 && <Alert message={alert} close={()=>setAlert("")}/>}
            <button id="fm-submit-form" onClick={submitBooking}>Add booking</button>
        </div>
    );
}
export default AddNewBooking;