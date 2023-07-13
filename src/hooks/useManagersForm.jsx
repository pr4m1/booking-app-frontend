import { useEffect,useState } from "react";
import { fetchLoadData } from "../services/api";
import { MANAGER_TYPE } from "../Configuration";


function useManagersForm(){
    const [managers,setManagers] = useState([]);
    const [managerSelected,setManagerSelected]=useState(null);

    useEffect(() => {
        fetchLoadData(MANAGER_TYPE+"/all")
            .then(data => {
                setManagers(data);
                if(data.length>0) setManagerSelected(data[0])
                })
            .catch(err=>{});
    // eslint-disable-next-line
    },[]);

    return { managers,managerSelected,setManagerSelected };

};

export default useManagersForm;