import { useState } from "react";
import { fetchAddData } from "../../../services/api";
import { LAB_TYPE } from "../../../Configuration";
import { Alert } from "../../../components/Alert";
import useManagersForm from "../../../hooks/useManagersForm";
import { useDataContext } from "../../../contexts/useDataContext";
import Form from "../../../components/Form";

function FormLab () {
    const { update: updateTable } = useDataContext();

    const [nameLab,setNameLab]=useState("");
    const { managers,managerSelected,setManagerSelected } = useManagersForm();
    const [alert,setAlert]=useState("");

    const submitLab = () => {
        if(nameLab.length===0){
            setAlert("Write a name!");
        }else if(!managerSelected){
            setAlert("First add a manager!");
        
        }else{
            let labNew={
                name: nameLab,
                manager: {id:managerSelected.id}
            };
            fetchAddData(LAB_TYPE,labNew)
                .then(()=>updateTable()) 
                .catch((error) => {
                    if (error?.message) {
                        setAlert(error.message);
                    }else{
                        setAlert("Problem adding booking!")
                    }
                });
        }
    }

    return (
        <Form justifyLeft="left">
            {alert.length>0 && <Alert message={alert} close={()=>setAlert("")}/>}
            <div className="form-container">
                <label>Lab's name:</label>
                <input className="form-fit-content" type="text" value={nameLab} onChange={(event)=>setNameLab(event.target.value)} placeholder='Ex: Chemistry Lab'/>
            </div>
            <div className="form-container">
                <label>Select a manager:</label>
                <select className="form-fit-content" onChange={(e) => setManagerSelected(JSON.parse(e.target.value))}>
                    {managers.length>0 ?
                        managers.map((manager) => {
                            return <option key={manager.id} value={JSON.stringify(manager)}>{manager.name}</option>;
                        })
                        : <option  value ="" hidden>No managers available</option>
                    }
                </select>
            </div>
            <div className="form-container-submit">
                <button id="fm-submit-form" onClick={submitLab}>Add booking</button>
            </div>
        </Form>
    );

}

export default FormLab;