import { useState } from "react";
import users from "./Users";


let Login = () =>{
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState();
    const [showErr, setErr] = useState(false);

    const checkEmail = (email) => {
        users.forEach((obj) => {if(obj.email === email) return true;})
        return false;
    }
    const checkPassword = (password) => {
        users.forEach((obj) => {if(obj.password === password) return true;})
        return false;
    }
    const validate = () => {
        if(checkEmail(email) && checkPassword(password)) {showErr = false;}//go to next pages
        else showErr = true;
    }
    const handleEmail = (event) => setEmail(event.target.value);
    const handlePassword = (event) => setPassword(event.target.value);
    return(
        <form onSubmit={validate}>
        {showErr && <p>Email is wrong</p>}
        <label htmlFor="email">Enter your email</label>
        <input type="email" id="email" required placeholder="JohnDoe123@helloworld.com" onChange={handleEmail}/> <br />

        {showErr && <p>Password is incorrect</p>}
        <label htmlFor="password">Enter your password</label>
        <input type="text" id="password" required onChange={handlePassword}/> <br />

        <button type="submit">Login</button>
        </form>
    );
}

export default Login