import { useState } from "react";
import users from "./Users"
import { useNavigate } from "react-router-dom";
import "../styles/login.css";//Elizabeth added
import './login.css'; // Elizabeth
import axios from "axios";

const Login = (props) =>{
    //state declarations for email, apssword, and error message
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState();
    const [showErr, setErr] = useState(false);
    const navigate = useNavigate();

    //checks if account with given email exists, returns true if yes, no otherwise
    const checkEmail = () => {
        let exists = false;
        users.forEach((obj) => {if(obj.email === email) exists = true;})
        return exists;
    }

    //checks if account with given password exists, return true if yes, no otherwise
    const checkPassword = () => {
        let exists = false;
        users.forEach((obj) => {if(obj.password === password) exists = true;})
        return exists;
    }

    //validates user info by checking email and password, if info valid navigate to home page, else return error
    const validate = async(event) => {
        event.preventDefault();

        if(checkEmail() && checkPassword()) {
            // Find the user that matches the email
            const currentUser = users.find(user => user.email === email);
            
            // Store user info in localStorage
            localStorage.setItem('currentUser', JSON.stringify(currentUser));
            
            setErr(false);
            const info = {email: email, password: password};
            axios.get("http://localhost:3000/", {info});
            navigate('/home');
        }
        else setErr(true);
    }

    //event handlers for email and password
    const handleEmail = (event) => setEmail(event.target.value);
    const handlePassword = (event) => setPassword(event.target.value);

    //html to be displayed
    return(
        <form onSubmit={validate}>
        {showErr && <p>Email or password are incorrect</p>}
        <label htmlFor="email">Enter your email</label>
        <input type="email" id="email" required placeholder="JohnDoe123@helloworld.com" onChange={handleEmail}/> <br />

        <label htmlFor="password">Enter your password</label>
        <input type="text" id="password" required onChange={handlePassword}/> <br />

        <button type="submit">Login</button>
        </form>
    );
}

export default Login