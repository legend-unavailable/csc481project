import { useState } from "react";
import { useNavigate } from "react-router-dom"; // Add this import
import "../styles/Event_create.css";//Elizabeth added

const Event_create = () => {
    /*const [showOnl, setShowOnl] = useState(false);
    const [showInp, setShowInp] = useState(false);
    const dblSpace = <><br /><br /></>;*/
    const [eventType, setEventType] = useState(''); // 'online' or 'inPerson'
    const [showLocationInput, setShowLocationInput] = useState(false);
    const navigate = useNavigate(); // Added this to go back to home

    // Handle radio button change
    const handleEventTypeChange = (type) => {
        setEventType(type);
        setShowLocationInput(true);
    };

    // Added this function to handle event/form submission
    const handleSubmit = (event) => {
        event.preventDefault();
        // Here we typically save the event data
        // For now, we'll just redirect to home
        navigate('/home');
    };

    return(
        <div className="event-container">
            <form onSubmit={handleSubmit}> {/* Add onSubmit handler */}
                <label htmlFor="name">Enter a name for your event?</label>
                <input type="text" id="name" placeholder="Enter event name" required/>

                <label>Specify what type of event you want to create?</label>
                <div id='eventType'>
                    <label className="radio-label">
                        <input 
                            type="radio" 
                            name="eventType" 
                            value="online"
                            onChange={() => handleEventTypeChange('online')}
                            required
                        /> 
                        Online
                    </label>
                    <label className="radio-label">
                        <input 
                            type="radio" 
                            name="eventType" 
                            value="inPerson"
                            onChange={() => handleEventTypeChange('inPerson')}
                        /> 
                        In Person
                    </label>
                </div>

                {showLocationInput && (
                    <>
                        <label htmlFor="where">Where is the event taking place?</label>
                        {eventType === 'online' ? (
                            <input 
                                type="text" 
                                id="where" 
                                placeholder="Enter Zoom/Meet link"
                                required
                            />
                        ) : (
                            <input 
                                type="text" 
                                id="where" 
                                placeholder="Enter physical address"
                                required
                            />
                        )}
                    </>
                )}

                <label htmlFor="when">When is the event taking place?</label>
                <input 
                    type="datetime-local" 
                    id="when" 
                    name="starTime"
                    required
                />

                <label htmlFor="length">How long is the event?</label>
                <input 
                    type="text" 
                    id="length" 
                    placeholder="e.g. 3 hours"
                    required
                />

                <label htmlFor="maxAttendees">Maximum number of attendees</label>
                <input 
                    type="number" 
                    id="maxAttendees" 
                    placeholder="Enter maximum number of attendees"
                    min="1"
                    required
                />

                <button type="submit">Create Event</button>
            </form>
        </div>
    );
}

export default Event_create;