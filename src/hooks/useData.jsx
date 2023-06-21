import { useEffect,useState } from "react";
import { fetchLoadData } from "../services/api";


function useData(type){
    const [data,setData] = useState([]);
    //0: Loading
    //1: Error
    //2: Succes Show Data
    //3: Succes Not Data 
    const [stateData,setStateData]= useState(0);

    const update = () =>{
        setStateData(0);
        fetchLoadData(type)
            .then(data => {
                if(data.length>0){
                    setData(data);
                    setStateData(2);
                }else{
                    setStateData(3);
                }
            })
            .catch(()=>{
                setStateData(1);
            });
    }
    
    useEffect(() => {
        update();
    // eslint-disable-next-line
    },[]);

    return { data, stateData, update };

};

export default useData;