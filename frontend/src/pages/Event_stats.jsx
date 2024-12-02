<<<<<<< HEAD
/*
=======
import axios from "axios";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

>>>>>>> 9509d615a3504a1b6422e0abdbe5a6a03423c07c
const Event_stats = () => {
    const [response, setResponse] = useState('');
    const [expand, setExpand] = useState(false);
    const navigate = useNavigate();

    const fetchAPI = async() => {
      const res = await axios.get("http://localhost:3000/eventS");
      setResponse(res.data.str);
      console.log(res.data.str);
    };

    useEffect(() => {
      fetchAPI();
    }, []);

    const list = () => {
        if (res.data.eventCount === 0) {
          return <p>No events found</p>;
        } else {
          for (let i = 0; i < res.data.eventCount; i++) {
            <li key={id++} onClick={() => {setExpand(!expand)}}>
              <h3>{res.data.eventName}</h3>
              <br />
              <p>{res.data.eventDate}</p>
              <br />
              <p>{res.data.eventLocation}</p>
              <br />
              {expand && <div>
                <p>{res.data.eventTime}</p>
                <p>{res.data.eventDuration}</p>
                <p>{res.data.eventGuests}</p>
                <button onClick={(e) => {setExpand(!expand)}}>Close</button>
              </div>}
            </li>;
          }
        }
    }
    return(
        <div>
          <button onClick={navigate('/home')}>Back</button>
          {list}
        </div>
    );
}
export default Event_stats
*/

import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom"; // Added this import
import "../styles/Event_stats.css";//Elizabeth added

const Event_stats = () => {
    const [events, setEvents] = useState([]);
    const [loading, setLoading] = useState(true);
    const navigate = useNavigate();
    const [currentUser, setCurrentUser] = useState(null);

    useEffect(() => {
        // Get current user and events from localStorage
        try {
            const user = JSON.parse(localStorage.getItem('currentUser'));
            setCurrentUser(user);
            const storedEvents = JSON.parse(localStorage.getItem('events') || '[]');
            setEvents(storedEvents);
        } catch (error) {
            console.error('Error loading data:', error);
        } finally {
            setLoading(false);
        }
    }, []);

    const formatDate = (dateString) => {
        try {
            return new Date(dateString).toLocaleString();
        } catch (error) {
            return 'Invalid Date';
        }
    };

    if (loading) {
        return <div className="event-stats-container">Loading...</div>;
    }

    return (
        <div className="event-stats-container">
            <div className="event-header">
                <div className="header-left">
                    <button onClick={() => navigate('/home')} className="back-btn">
                        Back to Home
                    </button>
                    <h1>Event Statistics</h1>
                </div>
                <button onClick={() => navigate('/eventC')} className="create-event-btn">
                    Create New Event
                </button>
            </div>

            <div className="events-grid">
                {events.length === 0 ? (
                    <div className="no-events">
                        <p>No events have been created yet.</p>
                        <p>Click "Create New Event" to get started!</p>
                    </div>
                ) : (
                    <div className="events-list">
                        {events.map((event, index) => (
                            <div key={event.id || index} className="event-card">
                                <div className="event-card-header">
                                    <h2>{event.name}</h2>
                                    <span className={`event-type ${event.type}`}>
                                        {event.type}
                                    </span>
                                </div>
                                
                                <div className="event-details">
                                    <p><strong>Location:</strong> {event.location}</p>
                                    <p><strong>Date:</strong> {formatDate(event.date)}</p>
                                    <p><strong>Duration:</strong> {event.duration}</p>
                                    <p><strong>Max Attendees:</strong> {event.maxAttendees}</p>
                                    <p><strong>Created By:</strong> {event.createdBy}</p>
                                    <p><strong>Current Attendees:</strong> {event.attendees?.length || 0}</p>
                                </div>

                                <div className="event-actions">
                                    {currentUser && event.createdBy === currentUser.email ? (
                                        <>
                                            <button 
                                                className="edit-btn"
                                                onClick={() => {/* Add edit handler */}}
                                            >
                                                Edit
                                            </button>
                                            <button 
                                                className="delete-btn"
                                                onClick={() => {/* Add delete handler */}}
                                            >
                                                Cancel Event
                                            </button>
                                        </>
                                    ) : (
                                        <button 
                                            className="join-btn"
                                            onClick={() => {/* Add join handler */}}
                                        >
                                            Join Event
                                        </button>
                                    )}
                                </div>
                            </div>
                        ))}
                    </div>
                )}
            </div>
        </div>
    );
}

export default Event_stats;