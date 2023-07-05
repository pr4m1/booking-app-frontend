import { useState } from "react";
import { fetchLabByManager } from "../../../services/api";


function useFormBookingLab(){
    const [labs,setLabs] = useState([]);
    const [labSelected,setLabSelected] = useState(null);

    const setNullLabs = () => {
        setLabs([]);
        setLabSelected(null);
    }

    const updateLabs = async (idManager) => {
        let labS= await fetchLabByManager(idManager)
            .then(data => {
                setLabs(data);
                let lab = data.length>0 ? data[0] : null;
                setLabSelected(lab);
                return lab;
            })
            .catch(()=>{setNullLabs();return null;});
        return labS;
    }

    return { labs,updateLabs,labSelected,setLabSelected,setNullLabs };

};

export default useFormBookingLab;