import { apiUrl, LAB_BY_MANAGER } from "../Configuration";

export const getUser = () => {
    return  JSON.parse(window.localStorage.getItem("user"));
}

const setUser = (user) => {
    window.localStorage.setItem("user",user);
}

const authHeader = () => {
    let user = getUser();
    if(user?.access_token){
        return {"Authorization":`Bearer ${user.access_token}`};
    }else{
        return {};
    }
}

const optionsNewElement = (data) => {
    let user = getUser();
    let headers;
    if(user?.access_token){
        headers = {
            "Authorization":`Bearer ${user.access_token}`,
            'Content-Type': 'application/json'
        }
    }else{
        headers = {
            'Content-Type': 'application/json'
        }
    }
    return({
        method: 'POST',
        headers: headers,
        body: JSON.stringify(data)
        });
};
export const login = (data) => {
    return fetch(apiUrl+"auth/login",optionsNewElement(data))
        .then(res => {
            if (!res.ok) {
                return res.json().then(data=>{throw new Error(data.message)});
            }
            return res.json().then(data=>setUser(JSON.stringify(data)));
        })
        .catch(err => {throw err;});
}
export const signup = (data) => {
    return fetch(apiUrl+"auth/signup",optionsNewElement(data))
        .then(res => {
            if (!res.ok) {
                return res.json().then(data=>{throw new Error(data.message)});
            }
            return res.json().then(data=>setUser(JSON.stringify(data)));
        })
        .catch(err => {throw err;});
}
export const logout = () => {
    window.localStorage.removeItem("user");
    window.location.href="/";
    return fetch(apiUrl+"auth/logout",{headers: authHeader()})
        .then(res => {
            if (!res.ok) {
                throw new Error("Problem with logout!");
            };
            return res.ok})
        .catch(err => {throw err;});
}

export const fetchLabByManager =  (idManager) => {
    return fetch(apiUrl+LAB_BY_MANAGER+idManager,{headers: authHeader()})
        .then(res => {
            if (!res.ok) {
                if(res.status===403){
                    logout();
                    return;
                }
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


export const fetchLoadData =  (type) => {
    return fetch(apiUrl+type,{headers: authHeader()})
        .then(res => {
            if (!res.ok) {
                if(res.status===403){
                    logout();
                    return;
                }
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
    return fetch(`${apiUrl}${type}/delete/${id}`, { headers: authHeader(),method: 'DELETE' })
        .then(res => {
            if (!res.ok) {
                if(res.status===403){
                    logout();
                    return;
                }
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
                if(res.status===403){
                    logout();
                    return;
                }
                return res.json().then(errorResponse => {
                    if(errorResponse?.message){
                        throw new Error(errorResponse.message);
                    }
                    throw new Error("Problem adding new element!");
                });
              }
            return res;})
        .catch((err) => {
            throw err;});
}

export const fetchTimeNotAvailable = async (props) => {
    return fetch(`${apiUrl}booking/disabled/${props.id_lab}/${props.date}`,{headers: authHeader()})
        .then(res => {
            if (!res.ok) {
                if(res.status===403){
                    logout();
                    return;
                }
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