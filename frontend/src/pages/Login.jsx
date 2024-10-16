import { useState } from "react";
import users from "./Users"
import { useNavigate } from "react-router-dom";

const Login = (props) =>{
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState();
    const [showErr, setErr] = useState(false);
    const navigate = useNavigate();

    const checkEmail = () => {
        let exists = false;
        users.forEach((obj) => {if(obj.email === email) exists = true;})
        return exists;
    }
    const checkPassword = () => {
        let exists = false;
        users.forEach((obj) => {if(obj.password === password) exists = true;})
        return exists;
    }
    const validate = (event) => {
        event.preventDefault();
        console.log(checkEmail());
        console.log(checkPassword());

        if(checkEmail() && checkPassword()) {
            setErr(false);
            navigate('/home');
        
        }
        else setErr(true);
    }
    const handleEmail = (event) => setEmail(event.target.value);
    const handlePassword = (event) => setPassword(event.target.value);
    return(
        <form onSubmit={validate}>
        {showErr && <p>Email or password are incorrect</p>}
        <label htmlFor="email">Enter your email</label>
        <input type="email" id="email" required placeholder="JohnDoe123@helloworld.com" onChange={handleEmail}/> <br />

        <label htmlFor="password">Enter your password</label>
        <input type="text" id="password" required onChange={handlePassword}/> <br />
        <p>{props.response}</p>

        <button type="submit">Login</button>
        </form>
    );
}

export default Login