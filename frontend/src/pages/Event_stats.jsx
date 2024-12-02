/*import axios from "axios";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

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
    const [event, setEvent] = useState();
    const [showEdit, setShowEdit] = useState(false);

    const stuff = [
      {
        name: "party",
        type: "in person",
        location: "house",
        date: "Dec 12, 2024",
        duration: "whole day",
        atendees: [{ name: "julian", email: "julian@email.com" }],
      },
      {
        name: "meeting",
        type: "online",
        location: "zoom",
        date: "Dec 20, 2024",
        duration: "one hour",
        atendees: [
          { name: "jesus", email: "jesus@email.com" },
          { name: "liz", email: "liz@email.com" },
        ],
      },
    ];
    
    
    

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

    const edit = () => {
      return (
        <form  method="PUT">
          <label htmlFor="name">Enter a name for your event?</label>
          <br />
          <input
            type="text"
            id="eName"
            required
            onChange={(e) => setEvent({ ...event, eventName: e.target.value })}
          />
          {dblSpace}

          <label htmlFor="type">
            Specify what type of event you want to create?
          </label>
          <div id="eventType">
            <input
              type="radio"
              name="eType"
              value="1"
              required
              onChange={() => setEvent({ ...event, eventType: "online" })}
            />{" "}
            Online
            <input
              type="radio"
              name="eType"
              value="2"
              required
              onChange={() => setEvent({ ...event, eventType: "in person" })}
            />
            In Person
          </div>
          <br />

          <label htmlFor="where">Where is the event taking place?</label>
          <br />
          <input
            type="text"
            id="eLocate"
            placeholder="e.g. Zoom"
            required
            onChange={(e) =>
              setEvent({ ...event, eventLocate: e.target.value })
            }
          />
          {dblSpace}

          <label htmlFor="when">
            When is the event taking place?
            <br /> Note that at the earliest, events can be scheduled in 3 days
            from today
          </label>
          <br />
          <input
            type="datetime-local"
            id="eDate"
            min={checkTime()}
            name="starTime"
            required
            onChange={(e) => setEvent({ ...event, eventDate: e.target.value })}
          />
          {dblSpace}

          <label htmlFor="length">How long is the event?</label>
          <br />
          <input
            type="text"
            id="eLength"
            placeholder="e.g. 3 hours"
            required
            onChange={(e) =>
              setEvent({ ...event, eventLength: e.target.value })
            }
          />
          {dblSpace}

          <button type="submit">Create Event</button>
        </form>
      );
    };

    return (
      <div className="event-stats-container">
        <div className="event-header">
          <div className="header-left">
            <button onClick={() => navigate("/home")} className="back-btn">
              Back to Home
            </button>
            <h1>Event Statistics</h1>
          </div>
          <button
            onClick={() => navigate("/eventC")}
            className="create-event-btn"
          >
            Create New Event
          </button>
        </div>

        <div className="events-grid">
          {
            /*events*/ stuff.length === 0 ? (
              <div className="no-events">
                <p>No events have been created yet.</p>
                <p>Click "Create New Event" to get started!</p>
              </div>
            ) : (
              <div className="events-list">
                {stuff.map((event, index) => (
                  <div key={stuff.id || index} className="event-card">
                    <div className="event-card-header">
                      <h2>{stuff.name}</h2>
                      <span className={`event-type ${stuff.type}`}>
                        {stuff.type}
                      </span>
                    </div>

                    <div className="event-details">
                      <p>
                        <strong>Location:</strong> {event.location}
                      </p>
                      <p>
                        <strong>Date:</strong> {formatDate(event.date)}
                      </p>
                      <p>
                        <strong>Duration:</strong> {event.duration}
                      </p>
                      <p>
                        <strong>Max Attendees:</strong> 100
                        {/*event.maxAttendees*/}
                      </p>
                      <p>
                        <strong>Created By:</strong> {/*event.createdBy*/}
                      </p>
                      <p>
                        <strong>Current Attendees:</strong>{" "}
                        {event.attendees?.length || 0}
                      </p>
                    </div>
                    {showEdit && (
                      <>
                        <form method="PUT">
                          <label htmlFor="name">
                            Enter a name for your event?
                          </label>
                          <br />
                          <input
                            type="text"
                            id="eName"
                            required
                            onChange={(e) =>
                              setEvent({ ...event, eventName: e.target.value })
                            }
                          />

                          <label htmlFor="type">
                            Specify what type of event you want to create?
                          </label>
                          <div id="eventType">
                            <input
                              type="radio"
                              name="eType"
                              value="1"
                              required
                              onChange={() =>
                                setEvent({ ...event, eventType: "online" })
                              }
                            />{" "}
                            Online
                            <input
                              type="radio"
                              name="eType"
                              value="2"
                              required
                              onChange={() =>
                                setEvent({ ...event, eventType: "in person" })
                              }
                            />
                            In Person
                          </div>
                          <br />

                          <label htmlFor="where">
                            Where is the event taking place?
                          </label>
                          <br />
                          <input
                            type="text"
                            id="eLocate"
                            placeholder="e.g. Zoom"
                            required
                            onChange={(e) =>
                              setEvent({
                                ...event,
                                eventLocate: e.target.value,
                              })
                            }
                          />

                          <label htmlFor="when">
                            When is the event taking place?
                            <br /> Note that at the earliest, events can be
                            scheduled in 3 days from today
                          </label>
                          <br />
                          <input
                            type="datetime-local"
                            id="eDate"
                            //min={checkTime()}
                            name="starTime"
                            required
                            onChange={(e) =>
                              setEvent({ ...event, eventDate: e.target.value })
                            }
                          />

                          <label htmlFor="length">How long is the event?</label>
                          <br />
                          <input
                            type="text"
                            id="eLength"
                            placeholder="e.g. 3 hours"
                            required
                            onChange={(e) =>
                              setEvent({
                                ...event,
                                eventLength: e.target.value,
                              })
                            }
                          />

                          <button type="submit">Create Event</button>
                        </form>
                      </>
                    )}

                    <div className="event-actions">
                      <div>
                        <button
                          className="edit-btn"
                          onClick={() => {
                            setShowEdit(showEdit);
                          }}
                        >
                          Edit
                        </button>
                        <button
                          className="delete-btn"
                          onClick={() => {
                            /* Add delete handler */
                          }}
                        >
                          Cancel Event
                        </button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            )
          }
        </div>
      </div>
    );
}

export default Event_stats;