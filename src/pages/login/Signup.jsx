import React, { useState } from 'react';
import Form from '../../components/Form';
import './style-components/Login.css';
import bookLabIcon from '../../assets/con_punto-removebg-preview.png';
import { NavLink } from 'react-router-dom';

function Signup(){
    const [username,setUsername] =useState("");
    const [password,setPassword] =useState("");
    const [passwordRepeat,setPasswordRepeat]=useState("");
    const [message,setMessage] = useState("");

    const submitLogin= () =>{
        if(password!==passwordRepeat){
            setMessage("Different password!");
        }
        setPassword("");
        setPasswordRepeat("");
    };
    return (
        <div className='container-principal-login'>
            <img src={bookLabIcon} alt='BookLab icon' />
            <h1>WELCOME TO BOOKLAB!</h1>
            <Form justifyLeft="left">
                <div className="form-container">
                    <label>Username:</label>
                    <input className="form-fit-content" type="text" value={username} onChange={(event)=>setUsername(event.target.value)} placeholder='username'/>
                </div>
                <div className="form-container">
                    <label>Password:</label>
                    <input className="form-fit-content" type="password" value={password} onChange={(event)=>setPassword(event.target.value)} placeholder='password'/>
                </div>
                <div className="form-container">
                    <label>Repeat password:</label>
                    <input className="form-fit-content" type="password" value={passwordRepeat} onChange={(event)=>setPasswordRepeat(event.target.value)} placeholder='password'/>
                </div>
                <div className="form-container-submit">
                    <button id="fm-submit-form" onClick={submitLogin}>Log in</button>
                </div>
            </Form>
            {message.length>0? <h4 className='error-message'>{message}</h4>: "" }
            <h4>Log in <NavLink className="text-link" to='/login'>here</NavLink>!</h4>
        </div>
    );
}

export default Signup;