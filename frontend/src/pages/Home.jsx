import { useState } from "react";
import { useNavigate } from "react-router-dom";

const Home = () => {
  const [showNav, setShowNav] = useState(false);
  const navigate = useNavigate();

  const handleNav = () => setShowNav(!showNav);
    return (
      <div>
        <div id="header">
          <div id="buttons">
            <div id="navbar">
              <button onClick={handleNav}>Nav bar</button>
              {showNav && (
                <div id="navContent">
                  <ul style={{listStyle: 'none'}}>
                    <li><button onClick={() => navigate('/chat')}><h3>Messages</h3></button></li>
                    <li><button onClick={() => navigate('/eventC')}><h3>Create Event</h3></button></li>
                    <li><button onClick={() => navigate('/eventS')}><h3>View Event</h3></button></li>
                    <li><button onClick={() => navigate('/invites')}><h3>View Invites</h3></button></li>
                  </ul>
                </div>
              )}
            </div>
            <div id="account">
              <button>Account settings</button>
            </div>
            <div id="signout">
              <button>Sign out</button>
            </div>
          </div>
          <div id="welcome">
            <h1>Welcome |insert name|</h1>
          </div>
        </div>

        <div id="body">
          <div id="messages">No new messages</div>
          <div id="events">No upcoming events</div>
          <div id="invites">No event invites</div>
        </div>
      </div>
    );
}
export default Home