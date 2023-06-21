import { useState } from "react";
import { fetchLoadData } from "../../../services/api";
import { LAB_BY_MANAGER } from "../../../Configuration";


function useFormBookingLab(){
    const [labs,setLabs] = useState([]);
    const [labSelected,setLabSelected] = useState(null);

    const setNullLabs = () => {
        setLabs([]);
        setLabSelected(null);
    }

    const updateLabs = async (idGestor) => {
        let labS= await fetchLoadData(LAB_BY_MANAGER+idGestor)
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