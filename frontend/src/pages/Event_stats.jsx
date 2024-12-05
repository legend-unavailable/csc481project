import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom"; // Added this import
import axios from 'axios'; // Add this import
import "../styles/Event_stats.css";//Elizabeth added

const Event_stats = () => {
    const [events, setEvents] = useState([]);
    const [loading, setLoading] = useState(true);
    const navigate = useNavigate();
    const [currentUser, setCurrentUser] = useState(null);

    useEffect(() => {
        const fetchData = async () => {
            try {
                // Gets user data from localStorage
                const user = JSON.parse(localStorage.getItem('currentUser'));
                if (!user) {
                    navigate('/'); // Redirect to login if no user
                    return;
                }
                setCurrentUser(user);
                
                // Fetch events from API with error logging
                const response = await axios.get("http://localhost:3001/api/events");
                if (response.data) {
                    setEvents(response.data);
                    console.log('Events loaded:', response.data);
                }
            } catch (error) {
                console.error('Error details:', error.response || error);
                setEvents([]); // Set empty array on error
            } finally {
                setLoading(false);
            }
        };
    
        fetchData();
    }, [navigate]); // Add navigate to dependencies

    // Helper function for date formatting - good separation of concerns
    const formatDate = (dateString, timeString) => {
        try {
            const date = new Date(`${dateString}T${timeString}`);
            return date.toLocaleString();
        } catch (error) {
            return 'Invalid Date';
        }
    };

    // Loading state handling - good UX
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
                            <div key={event.event_id || index} className="event-card">
                                <div className="event-card-header">
                                    <h2>{event.event_name}</h2>
                                    <span className={`event-type ${event.event_type}`}>
                                        {event.event_type}
                                    </span>
                                </div>
                                
                                <div className="event-details">
                                    <p><strong>Location:</strong> {event.location}</p>
                                    <p><strong>Date:</strong> {formatDate(event.event_date, event.event_time)}</p>
                                    <p><strong>Duration:</strong> {event.duration}</p>
                                    <p><strong>Max Attendees:</strong> {event.max_attendees}</p>
                                    <p><strong>Created By:</strong> {`${event.organizer_first_name} ${event.organizer_last_name}`}</p>
    
                                    {/* Add this section for attendees */}
                                    {currentUser && event.organizer_id === currentUser.user_id && (
                                        <div className="attendees-section">
                                            <h3>Attendees ({event.accepted_count}/{event.attendee_count})</h3>
                                            {event.attendees && event.attendees.length > 0 ? (
                                                <ul className="attendees-list">
                                                    {event.attendees.map((attendee, idx) => (
                                                        <li key={idx} className={`attendee-item ${attendee.status}`}>
                                                            <span>{attendee.first_name} {attendee.last_name}</span>
                                                            <span className="attendee-status">{attendee.status}</span>
                                                        </li>
                                                    ))}
                                                </ul>
                                            ) : (
                                                <p>No attendees yet</p>
                                            )}
                                        </div>
                                    )}
                                </div>

                                <div className="event-actions">
                                    {currentUser && event.organizer_id === currentUser.user_id ? (
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