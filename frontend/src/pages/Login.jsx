import { useState } from "react";
import { useNavigate } from "react-router-dom";
import "../styles/login.css";//Elizabeth added
import axios from "axios";

const Login = (props) =>{
    //state declarations for email, password, and error message
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [showErr, setErr] = useState(false);
    const navigate = useNavigate();

    //validates user info by checking email and password, if info valid navigate to home page, else return error
    const validate = async(event) => {
        event.preventDefault();

        try {
            // Make API call to backend
            const response = await axios.post("http://localhost:3001/api/login", {
                email: email,
                password: password
            });

            if (response.data) {
                // Store user info in localStorage
                localStorage.setItem('currentUser', JSON.stringify(response.data));
                setErr(false);
                navigate('/home');
            }
        } catch (error) {
            console.error('Login error:', error);
            setErr(true);
        }
    }

    //event handlers for email and password
    const handleEmail = (event) => setEmail(event.target.value);
    const handlePassword = (event) => setPassword(event.target.value);

    //html to be displayed
    return(
        /*<form onSubmit={validate}>
        {showErr && <p>Email or password are incorrect</p>}
        <label htmlFor="email">Enter your email</label>
        <input type="email" id="email" required placeholder="JohnDoe123@helloworld.com" onChange={handleEmail}/> <br />

        <label htmlFor="password">Enter your password</label>
        <input type="text" id="password" required onChange={handlePassword}/> <br />

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

                        {/* Added Sign Up Section */}
                        <div className="signup-section">
                            <p>Don't have an account?</p>
                            <button 
                                type="button" 
                                className="signup-btn"
                                onClick={() => navigate('/signup')}
                            >
                                Sign Up
                            </button>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    );
}

export default Login