import { useBookingContext } from "../contexts/useBookingContext";


function LabSelect(){
    const { labs,managers,updateLabSelected,updateManagerAndLabs }=useBookingContext();
    return (
        <div className="form-block-horizontal">
            <div className="form-container">
                <label>Select the lab:</label>
                <select className="form-fit-content" onChange={(e)=>updateLabSelected(JSON.parse(e.target.value))} >
                    {labs.length ? labs.map(lab => {
                        return(
                            <option key={lab.id} value={JSON.stringify(lab)} label={lab.name}>
                            </option>
                        );
                    }) : <option  value ="" hidden>No labs available</option> }
                </select>
            </div>
            <div  className="form-container">
                <label>Select the manager:</label>
                <select className="form-fit-content" onChange={(e)=>updateManagerAndLabs(JSON.parse(e.target.value))}>
                    {managers.length ? managers.map(manager => {
                    return(
                            <option key={manager.id} value={JSON.stringify(manager)} label={manager.name} >
                            </option>
                        );
                    }) : <option  value ="" hidden>No managers available</option>}
                </select>
            </div>
        </div>

    );
}

export default LabSelect;