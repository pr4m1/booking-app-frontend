import React, { useState } from 'react';
import Form from '../../components/Form';
import './style-components/Login.css';
import bookLabIcon from '../../assets/con_punto-removebg-preview.png';
import { NavLink } from 'react-router-dom';
import { signup } from '../../services/api';

function Signup(){
    const [username,setUsername] =useState("");
    const [password,setPassword] =useState("");
    const [passwordRepeat,setPasswordRepeat]=useState("");
    const [message,setMessage] = useState("");

    const checkPassword = (pass) => {
        // Check lowercase
        var regexMinuscula = /[a-z]/;
        if (!regexMinuscula.test(pass)) {
            return false;
        }
        
        // Check uppercase
        var regexMayuscula = /[A-Z]/;
        if (!regexMayuscula.test(pass)) {
            return false;
        }
        
        // Check number
        var regexNumero = /[0-9]/;
        if (!regexNumero.test(pass)) {
            return false;
        }
        
        // Check symbol
        var regexSimbolo = /[-!@#$%^&*()_+=[\]{};':"\\|,.<>/?]/;
        if (!regexSimbolo.test(pass)) {
            return false;
        }
        
        // Check length
        if (pass.length < 8) {
            return false;
        }
        return true;
    } 

    const submitSignup= () =>{
        if(username.length===0){
            setMessage("Enter a username!");
        }else if(!checkPassword(password)){
            setMessage("Requirements:\n" +
            "- 8 characters or more\n" +
            "- At least one lowercase\n" +
            "- At least one capital letter\n" +
            "- At least one number\n" +
            "- At least one symbol: [-!@#$%^&*()_+=[]{};':\"\\|,.<>/?]");
        }else if(password!==passwordRepeat){
            setMessage("Different password!");
        }else{
            const data ={
                username: username,
                password: password
            }
            signup(data)
                .then(()=>{window.location.href="/bookings"})
                .catch(error => {setMessage(error.message);})
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
                    <button id="fm-submit-form" onClick={submitSignup}>Sign up</button>
                </div>
            </Form>
            {message.length>0? <pre className='error-message'>{message}</pre>: "" }
            <h4>Log in <NavLink className="text-link" to='/login'>here</NavLink>!</h4>
        </div>
    );
}

export default Signup;