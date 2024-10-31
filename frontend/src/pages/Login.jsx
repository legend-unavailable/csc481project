import { useState } from "react";
import users from "./Users"
import { useNavigate } from "react-router-dom";
import './login.css'; // Elizabeth

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
        /*<form onSubmit={validate}>
        {showErr && <p>Email or password are incorrect</p>}
        <label htmlFor="email">Enter your email</label>
        <input type="email" id="email" required placeholder="JohnDoe123@helloworld.com" onChange={handleEmail}/> <br />

        <label htmlFor="password">Enter your password</label>
        <input type="text" id="password" required onChange={handlePassword}/> <br />
        <p>{props.response}</p>

        <button type="submit">Login</button>
        </form>*/
        <div className="login-container">
            <div className="main-content">
                <div className="form-container">
                    <div className="logo-container">
                        <h1 className="logo-text">Event Management</h1>
                    </div>

                    {showErr && (
                        <div className="error-message">
                            Email or password are incorrect
                        </div>
                    )}

                    <form onSubmit={validate}>
                        <div className="form-group">
                            <label htmlFor="email">Email</label>
                            <input
                                type="email"
                                id="email"
                                required
                                placeholder="JohnDoe123@helloworld.com"
                                onChange={handleEmail}
                                value={email}
                            />
                        </div>

                        <div className="form-group">
                            <label htmlFor="password">Password</label>
                            <input
                                type="password"
                                id="password"
                                required
                                placeholder="Enter your password"
                                onChange={handlePassword}
                                value={password}
                            />
                        </div>

                        {props.response && (
                            <p className="response-message">{props.response}</p>
                        )}

                        <button type="submit" className="submit-btn">
                            Login
                        </button>
                    </form>
                </div>
            </div>
        </div>
    );
}

export default Login