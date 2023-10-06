import { API_URL, BOOKING_DISABLED, DELETE, LAB_BY_MANAGER, LOGIN,LOGOUT, SAVE, SIGNUP } from "../Configuration";

export const getUser = () => {
    return  JSON.parse(window.localStorage.getItem("user"));
}; 

export const removeUser = () => {
    window.localStorage.removeItem("user");
}; 

const setUser = (user) => {
    window.localStorage.setItem("user",user);
}; 

const authHeader = () => {
    let user = getUser();
    if(user?.access_token){
        return {"Authorization":`Bearer ${user.access_token}`};
    }else{
        return {};
    }
}; 

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
    return fetch(API_URL+LOGIN,optionsNewElement(data))
        .then(res => {
            if (!res.ok) {
                return res.json().then(data=>{throw new Error(data.message)});
            }
            return res.json().then(data=>setUser(JSON.stringify(data)));
        })
        .catch(err => {throw err;});
}; 

export const signup = (data) => {
    return fetch(API_URL+SIGNUP,optionsNewElement(data))
        .then(res => {
            if (!res.ok) {
                return res.json().then(data=>{throw new Error(data.message)});
            }
            return res.json().then(data=>setUser(JSON.stringify(data)));
        })
        .catch(err => {throw err;});
}; 

export const logout = () => {
    removeUser();
    window.location.href="/";
    return fetch(API_URL+LOGOUT,{headers: authHeader()})
        .then(res => {
            if (!res.ok) {
                throw new Error("Problem with logout!");
            };
            return res.ok})
        .catch(err => {throw err;});
}; 

export const fetchLabByManager =  (idManager) => {
    return fetch(API_URL+LAB_BY_MANAGER+idManager,{headers: authHeader()})
        .then(res => {
            if (!res.ok) {
                if(res.status===403){
                    logout();
                    throw new Error();
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
    return fetch(API_URL+type,{headers: authHeader()})
        .then(res => {
            if (!res.ok) {
                if(res.status===403){
                    logout();
                    throw new Error();
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
    return fetch(`${API_URL}${type}${DELETE}${id}`, { headers: authHeader(),method: 'DELETE' })
        .then(res => {
            if (!res.ok) {
                if(res.status===403){
                    logout();
                    throw new Error();
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
}; 

export const fetchAddData = (type,data) =>{
    return fetch(`${API_URL}${type}${SAVE}`,optionsNewElement(data))
        .then(res => {
            if (!res.ok) {
                if(res.status===403){
                    logout();
                    throw new Error();
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
}; 

export const fetchTimeNotAvailable = async (props) => {
    return fetch(`${API_URL}${BOOKING_DISABLED}${props.id_lab}/${props.date}`,{headers: authHeader()})
        .then(res => {
            if (!res.ok) {
                if(res.status===403){
                    logout();
                    throw new Error();
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
}; 