import { apiUrl } from "../Configuration";


const optionsNewElement = (data) => {
    return({
        method: 'POST',
        headers: {
                    'Content-Type': 'application/json',
                },
        body: JSON.stringify(data)
        });
};



export const fetchLoadData =  (type) => {
    return fetch(apiUrl+type)
        .then(res => {
            if (!res.ok) {
                return res.json().then(errorResponse => {
                    if(errorResponse?.message){
                        throw new Error(errorResponse.message);
                    }
                    throw new Error("Problem adding new element!");
                });
            } 
            return res.json();})
        .catch(err => {throw err;});
}; 

export const fetchDeleteData = (type,id) =>{
    return fetch(`${apiUrl}${type}/delete/${id}`, { method: 'DELETE' })
        .then(res => {
            if (!res.ok) {
                return res.json().then(errorResponse => {
                    if(errorResponse?.message){
                        throw new Error(errorResponse.message);
                    }
                    throw new Error("Problem adding new element!");
                });
            } 
            return res;})
        .catch((err) => {throw err;});
}
export const fetchAddData = (type,data) =>{
    return fetch(`${apiUrl}${type}/save`,optionsNewElement(data))
        .then(res => {
            if (!res.ok) {
                return res.json().then(errorResponse => {
                    if(errorResponse?.message){
                        throw new Error(errorResponse.message);
                    }
                    throw new Error("Problem adding new element!");
                });
              }
            return res;})
        .catch((err) => {throw err;});
}

export const fetchTimeNotAvailable = async (props) => {
    return fetch(`${apiUrl}booking/disabled/${props.id_lab}/${props.date}`)
        .then(res => {
            if (!res.ok) {
                return res.json().then(errorResponse => {
                    if(errorResponse?.message){
                        throw new Error(errorResponse.message);
                    }
                    throw new Error("Problem adding new element!");
                });
            } 
            return res.json();})
        .catch(err=>{throw err});
}