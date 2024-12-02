import { useState } from "react";
import users from "./Users"
import { useNavigate } from "react-router-dom";
import "../styles/login.css";//Elizabeth added
import axios from "axios";

const Login = () =>{
    //state declarations for email, apssword, and error message
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
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

        
        /*const info = {email: email, password: password};
        try {
            await axios.post('http://localhost:3000/login', {params: {email: email, password: password_hash}})
            navigate('/home')
        } catch (err) {
            setErr(true);
        }*/

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
    return (
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

              <button type="submit" className="submit-btn">
                Login
              </button>

              {/* Added Sign Up Section */}
              <div className="signup-section">
                <p>Don't have an account?</p>
                <button
                  type="button"
                  className="signup-btn"
                  onClick={() => navigate("/signup")}
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