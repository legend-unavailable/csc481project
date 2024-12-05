import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import "../styles/Home.css";//Elizabeth added
import axios from "axios";

const Home = () => {
  const [showNav, setShowNav] = useState(false);
  const [events, setEvents] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchEvents = async () => {
      try {
        const response = await axios.get('http://localhost:3001/api/events');
        // Get only the 3 most recent events
        setEvents(response.data.slice(0, 3));
      } catch (error) {
        console.error('Error fetching events:', error);
      }
    };

    fetchEvents();
  }, []);

  const currentUser = JSON.parse(localStorage.getItem('currentUser')) || { first_name: 'Guest', last_name: '' };

  const handleNav = () => setShowNav(!showNav);

  const handleSignOut = () => {
    localStorage.removeItem('currentUser');
    navigate('/');
  };

  // Helper function for date formatting
  const formatDate = (dateString, timeString) => {
    try {
        const date = new Date(`${dateString}T${timeString}`);
        return date.toLocaleString();
    } catch (error) {
        return 'Invalid Date';
    }
  };

  return (
    <div className="home-container">
      <div id="header">
        <nav id="buttons">
          <div id="navbar">
            <button onClick={handleNav}>Nav bar</button>
            {showNav && (
              <div id="navContent">
                <ul>
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
          <h1>Welcome {currentUser.first_name} {currentUser.last_name}</h1>
        </div>

        <div id="body">
          <div id="events">
            {events.length > 0 ? (
              <div className="events-list">
                {events.map((event, index) => (
                  <div key={event.event_id || index} className="event-card">
                    <h3>{event.event_name}</h3>
                    <p><strong>Date:</strong> {formatDate(event.event_date, event.event_time)}</p>
                    <p><strong>Location:</strong> {event.location}</p>
                    <p><strong>Type:</strong> {event.event_type}</p>
                  </div>
                ))}
              </div>
            ) : (
              <p>No upcoming events</p>
            )}
          </div>
          <div id="invites">No event invites</div>
        </div>
      </div>
    </div>
  );
}

export default Home;