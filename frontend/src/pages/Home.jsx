import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import "../styles/Home.css";//Elizabeth added
import axios from "axios";

const Home = () => {
  const [showNav, setShowNav] = useState(false);
  const navigate = useNavigate();
  const [response, setResponse] = useState('');

  const fetchApi = async() => {
    const res = await axios.get('https://localhost:3000/home');
    //setResponse(res.data.userInfo);
  }

  useEffect(() => {fetchApi()}, []);
  // Get user info from localStorage
  const currentUser = JSON.parse(localStorage.getItem('currentUser')) || { name: 'Guest' };

  const handleNav = () => setShowNav(!showNav);

  // Update sign out to clear localStorage
  const handleSignOut = () => {
    localStorage.removeItem('currentUser');
    navigate('/');
  };

  //shows some events under the user (not functional)
  const events = () => {
    if (res.events.length === 0) {
      return(<p>No upcoming events</p>)
    }
    else{
      for (let i = 0; i < 3; i++) {
        <li key={id++}>
          <h3>{res.data.eventName}</h3><br />
          <p>{res.data.eventDate}</p><br />
          <p>{res.data.eventLocation}</p><br />
        </li>        
      }
    }
  }

  //shows invites sent to user (not functional)
  const invites = () => {
    if (res.events.invites === 0) {
      return <p>No invites</p>;
    } else {
      for (let i = 0; i < 3; i++) {
        <li key={id++}>
          <h3>{res.data.eventName}</h3>
          <br />
          <p>Click to view invite</p>
          <br />
        </li>
      }
    }
  };
  
return (
  <div className="home-container">  {/* Added wrapper class */}
    <div id="header">
      <nav id="buttons">  {/* Changed to nav element */}
        <div id="navbar">
          <button onClick={handleNav}>Nav bar</button>
          {showNav && (
            <div id="navContent">
              <ul>
                {/*<li><button onClick={() => navigate('/chat')}>Messages</button></li>*/}
                <li><button onClick={() => navigate('/eventC')}>Create Event</button></li>
                <li><button onClick={() => navigate('/eventS')}>View Event</button></li>
                <li><button onClick={() => navigate('/invites')}>View Invites</button></li>
              </ul>
            </div>
          )}
        </div>
        <div id="account">
          <button>Account settings</button>
        </div>
        <div id="signout">
            <button onClick={handleSignOut}>Sign out</button>
        </div>
      </nav>
      
      <div id="welcome">
          <h1>Welcome {currentUser.name}</h1>
          {/*<h1>Welcome {res.data.name}</h1>*/}
        </div>

        <div id="body">
          {/*<div id="messages">No new messages</div>*/}
          <div id="events">No upcoming events</div>
          <div id="invites">No event invites</div>
        </div>
      </div>
    </div>
  );
}

export default Home;