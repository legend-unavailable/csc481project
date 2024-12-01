import axios from "axios";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

const SignUp = () => {
    const [user, setUser] = useState();
    const [errStatus, setErrStatus] = useState({length: false, number: false, special: false, upper: false, lower: false});
    const navigate = useNavigate();

    //submit info and move to login page if password valid
    const submit = async(e) => {
      e.preventDefault();
      if (validatePassword()) {
        try {
          await axios.post("http://localhost:3000/signup", { user });
          navigate('/');
        } catch (err) {
          console.log(user);
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
      <>
        <form >
          <label htmlFor="">Enter your first name</label><br />
          <input
            type="text"
            name=""
            id=""
            required
            onChange={(e) => setUser({ ...user, firstName: e.target.value })}
          /> <br />

          <label htmlFor="">Enter your last name</label><br />
          <input
            type="text"
            name=""
            id=""
            required
            onChange={(e) => setUser({ ...user, lastName: e.target.value })}
          /> <br />

          <label htmlFor="">Enter your Email</label><br />
          <input
            type="email"
            name=""
            id=""
            required
            onChange={(e) => setUser({ ...user, email: e.target.value })}
          /> <br />

          <label htmlFor="">Create a password</label> <br />
          {errStatus.length && <p>Password must be at least 6 characters long</p>}
          {errStatus.upper && <p>Password must contain at least one upper case letter</p> }
          {errStatus.lower &&<p>Password must contain at least one lower case letter</p> }
          {errStatus.number && <p>Password must contain at least one number</p>}
          {errStatus.special && <p>Passwork must contain at least one special character e.g. $, @, &, etc.</p>}
          <input
            type="text"
            name=""
            id=""
            required
            onChange={(e) => {setUser({...user, password: e.target.value})}}
          /> <br />

          <button type="submit" onClick={submit}>
            Create Account
          </button>
        </form>
      </>
    );
}
export default SignUp;