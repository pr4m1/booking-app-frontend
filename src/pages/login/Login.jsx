import React, { useState } from 'react';
import Form from '../../components/Form';
import './style-components/Login.css';
import bookLabIcon from '../../assets/con_punto-removebg-preview.png';
import { NavLink } from 'react-router-dom';

function Login(){
    const [username,setUsername] =useState("");
    const [password,setPassword] =useState("");
    const [message,setMessage] = useState("");
    const submitLogin= () =>{
        setMessage(`Test de message! ${username}`);
        setPassword("");
    };
    return (
        <div className='container-principal-login'>
            <img src={bookLabIcon} alt='BookLab icon' />
            <h1>WELCOME BACK!</h1>
            <Form justifyLeft="left">
                <div className="form-container">
                    <label>Username:</label>
                    <input className="form-fit-content" type="text" value={username} onChange={(event)=>setUsername(event.target.value)} placeholder='username'/>
                </div>
                <div className="form-container">
                    <label>Password:</label>
                    <input className="form-fit-content" type="password" value={password} onChange={(event)=>setPassword(event.target.value)} placeholder='password'/>
                </div>
                <div className="form-container-submit">
                    <button id="fm-submit-form" onClick={submitLogin}>Log in</button>
                </div>
            </Form>
            {message.length>0? <h4 className='error-message'>{message}</h4>: "" }
            <h4>Sign up <NavLink className="text-link" to='/signup'>here</NavLink>!</h4>
        </div>
    );
}

export default Login;