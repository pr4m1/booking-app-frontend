import { useState } from "react";
import { fetchAddData } from "../../../services/api";
import { availableTimeSlots,MANAGER_TYPE } from "../../../Configuration";
import { Alert } from "../../../components/Alert";
import Form from "../../../components/Form";
import { useDataContext } from "../../../contexts/useDataContext";

function FormManager () {
    const { update: updateTable } = useDataContext();

    const [nameManager,setNameManager]=useState("");
    const [timeSlotSelect,setTimeSlotSelect]=useState(availableTimeSlots[0]);

    const [valueDay, setValueDay] = useState(1);
    const [valueWeek, setValueWeek] = useState(1);
    const [valueTotal, setValueTotal] = useState(1);

    const [alert,setAlert]=useState("");

    const submitManager = () => {
        if(nameManager.length===0){
            setAlert("Write a name!");
        }else{ 
            let managerNew={
                name: nameManager,
                duration: timeSlotSelect,
                numberTimeSlotsDay: valueDay,
                numberTimeSlotsWeek: valueWeek,
                numberTimeSlotsTotal: valueTotal
            };
            fetchAddData(MANAGER_TYPE,managerNew)
                .then(()=>updateTable()) 
                .catch((error) => {
                    if (error?.message) {
                        setAlert(error.message);
                    }else{
                        setAlert("Problem adding manager!")
                    }
                });
                
        }
    }

    const handleInput = (event,setValue) => {
        if(event.target.value!==""){
            let value = parseInt(event.target.value, 10); 
            if(value>0){
                setValue(value);
            }
        }else{
            setValue(event.target.value);
        }
    };
    const handleBlurDay = (event) => {
        if(event.target.value===""){
            setValueDay(1);
        }else{
            let value = parseInt(event.target.value, 10);
            if(value>0){
                if(valueWeek<value){
                    setValueWeek(value);
                    if(valueTotal<value){
                        setValueTotal(value);
                    }
                }
            }
        }
    };
    const handleBlurWeek = (event) => {
        if(event.target.value===""){
            setValueWeek(valueDay);
        }else{
            let value = parseInt(event.target.value, 10);
            if(value>0){
                if(value<valueDay){
                    setValueDay(value);
                }
                if(valueTotal<value){
                    setValueTotal(value);
                }
            }
        }
    };
    const handleBlurTotal = (event) => {
        if(event.target.value===""){
            setValueTotal(valueWeek);
        }else{
            let value = parseInt(event.target.value, 10);
            if(value<valueWeek){
                setValueWeek(value);
                if(value<valueDay){
                    setValueDay(value);
                }
            }
        }
    };
 

    return (
        <Form>
            {alert.length>0 && <Alert message={alert} close={()=>setAlert("")}/>}
            <div className="form-container">
                <label>Manager's name:</label>
                <input className="form-fit-content" type="text" value={nameManager} onChange={(event)=>setNameManager(event.target.value)} placeholder='Ex: Chemistry'/>
            </div>
            <div className="form-container">
                <label>Duration of the reservation:</label>
                <select className="form-fit-content" value={timeSlotSelect} onChange={(event)=>setTimeSlotSelect(event.target.value)}>
                    {
                        availableTimeSlots.map((slot) => {
                            return <option key={slot} value={slot}>{slot}</option>;
                        })
                    }
                </select>
            </div>
            <div className="form-container">
                <label>Maximum number of reservations per day:</label>
                <input type="number"
                    id="numberInput"
                    value={valueDay}
                    onInput={(event)=>handleInput(event,setValueDay)}
                    onBlur={handleBlurDay}
                    min="1"
                />
            </div>
            <div className="form-container">
                <label>Maximum number of reservations per week:</label>
                <input type="number"
                    id="numberInput"
                    value={valueWeek}
                    onInput={(event)=>handleInput(event,setValueWeek)}
                    onBlur={handleBlurWeek}
                    min="1"
                />
            </div>
            <div className="form-container">
                <label>Maximum number of total reservations:</label>
                <input type="number"
                    id="numberInput"
                    value={valueTotal}
                    onInput={(event)=>handleInput(event,setValueTotal)}
                    onBlur={handleBlurTotal}
                    min="1"
                />
            </div>
            <div className="form-container-submit">
                <input id="fm-submit-form" type="submit" value="Add manager" onClick={submitManager} />
            </div>
        </Form>
    );

}

export default FormManager;