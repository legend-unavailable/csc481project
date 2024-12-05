import axios from "axios";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import "../styles/SignUp.css"; //Elizabeth added

const SignUp = () => {
    const [user, setUser] = useState();
    const [errStatus, setErrStatus] = useState({length: false, number: false, special: false, upper: false, lower: false});
    const [successMessage, setSuccessMessage] = useState('');
    const navigate = useNavigate();

    //submit info and move to login page if password valid
    const submit = async(e) => {
      e.preventDefault();
      if (validatePassword()) {
          try {
              const response = await axios.post("http://localhost:3001/api/signup", { user });
              setSuccessMessage('Account created successfully!');
              
              // Disable the submit button
              e.target.querySelector('button[type="submit"]').disabled = true;
              
              // Wait before redirecting
              setTimeout(() => {
                  navigate('/', { replace: true });
              }, 2000);
          } catch (err) {
              console.error('Error details:', err.response || err);
              setSuccessMessage(''); // Clear any existing success message
          }
      }
  }
    
    //check if password meets all criteria, if not display err msg, if yes return true
    const validatePassword = () => {
        const password = user.password;

        const errors = {
            length: !(password.length >= 6 && password.length <= 20),
            special: !/[!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?]/.test(password),
            number: true,
            upper: true,
            lower: true,
        };

        for (let i = 0; i < password.length; i++) {
            const charCode = password.charCodeAt(i);
            if (charCode >= 48 && charCode <= 57) {
                errors.number = false; // Contains a number
            } else if (charCode >= 65 && charCode <= 90) {
                errors.upper = false; // Contains an uppercase letter
            } else if (charCode >= 97 && charCode <= 122) {
                errors.lower = false; // Contains a lowercase letter
            }

            // Break early if all criteria are met
            if (!errors.number && !errors.upper && !errors.lower) break;
        }
        setErrStatus(errors);

        return !Object.values(errors).some((value) => value);
    }

    return (
        <div className="signup-container">
            <div className="main-content">
                <div className="form-container">
                    <div className="logo-container">
                        <h1 className="logo-text">Create Account</h1>
                    </div>

                    {successMessage && (
                        <div className="success-message">
                            {successMessage}
                        </div>
                    )}

                    <form onSubmit={submit}>
                        <div className="form-group">
                            <label htmlFor="firstName">Enter your first name</label>
                            <input
                                type="text"
                                id="firstName"
                                required
                                onChange={(e) => setUser({ ...user, firstName: e.target.value })}
                            />
                        </div>

                        <div className="form-group">
                            <label htmlFor="lastName">Enter your last name</label>
                            <input
                                type="text"
                                id="lastName"
                                required
                                onChange={(e) => setUser({ ...user, lastName: e.target.value })}
                            />
                        </div>

                        <div className="form-group">
                            <label htmlFor="email">Enter your Email</label>
                            <input
                                type="email"
                                id="email"
                                required
                                onChange={(e) => setUser({ ...user, email: e.target.value })}
                            />
                        </div>

                        <div className="form-group">
                            <label htmlFor="password">Create a password</label>
                            <input
                                type="password"
                                id="password"
                                required
                                onChange={(e) => {setUser({...user, password: e.target.value})}}
                            />
                            <div className="password-requirements">
                                {errStatus.length && <p>Password must be at least 6 characters long</p>}
                                {errStatus.upper && <p>Password must contain at least one upper case letter</p>}
                                {errStatus.lower && <p>Password must contain at least one lower case letter</p>}
                                {errStatus.number && <p>Password must contain at least one number</p>}
                                {errStatus.special && <p>Password must contain at least one special character e.g. $, @, &, etc.</p>}
                            </div>
                        </div>

                        <button
                            type="submit" 
                            className="submit-btn"
                            disabled={!!successMessage}
                        >
                          {successMessage ? 'Creating Account...' : 'Create Account'}
                        </button>

                        <div className="social-login">
                            <button type="button">Google</button>
                            <button type="button">Twitter</button>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    );
}

export default SignUp;