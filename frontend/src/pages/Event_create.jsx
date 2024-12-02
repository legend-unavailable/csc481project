import axios from "axios";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import "../styles/Event_create.css";

const Event_create = () => {
    // State management for both form steps
    const [eventType, setEventType] = useState('');
    const [showLocationInput, setShowLocationInput] = useState(false);
    const [showInvites, setShowInvites] = useState(false);
    const [showForm, setShowForm] = useState(true);
    const navigate = useNavigate();

    // Guest management states
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [guests, setGuests] = useState([]);
    const [event, setEvent] = useState({});

    // Date validation function from first version
    const checkTime = () => {
        const todayDate = new Date();
        const daysInCurrentMonth = new Date(todayDate.getFullYear(), todayDate.getMonth(), 0).getDate();
        let minDay, minMonth, minYear;

        if (todayDate.getDate()+3 > daysInCurrentMonth) {
            minDay = todayDate.getDate() + 3 - daysInCurrentMonth;
            if (todayDate.getMonth() === 12) {
                minMonth = 1;
                minYear = todayDate.getFullYear() + 1;
            } else {
                minMonth = todayDate.getMonth() + 2;
                minYear = todayDate.getFullYear(); 
            }
        } else {
            minDay = todayDate.getDate() + 3;
            minMonth = todayDate.getMonth() + 1;
            minYear = todayDate.getFullYear();
        }

        if (minMonth < 10) {minMonth = `0${minMonth}`;}
        if (minDay < 10) {minDay = `0${minDay}`;}

        return `${minYear}-${minMonth}-${minDay}T00:00`;
    };

    // Guest management functions
    const addGuests = (e) => {
        e.preventDefault();
        setGuests([...guests, {name: name, email: email}]);
        document.getElementById('name').value = '';
        document.getElementById("email").value = "";
    };

    const endEvent = async() => {
        setEvent({...event, guests: guests});
        try {
            await axios.post('http://localhost:3000/eCreate', {event});
            navigate('/home');
        } catch (error) {
            console.log(error);
        }
    };

    // Form transition
    const handleFirstFormSubmit = (e) => {
        e.preventDefault();
        setShowForm(false);
        setShowInvites(true);
    };

    // Guest list rendering
    const list = guests.length === 0 ? (
        <p>No one has been added</p>
    ) : (
        guests.map((guest, id = 0) => (
            <li key={id++}>
                Name: {guest.name} | Email: {guest.email} | ID: {id}
                <br />
            </li>
        ))
    );

    return (
        <div className="event-container">
            {showForm && (
                <form onSubmit={handleFirstFormSubmit}>
                    <label htmlFor="name">Enter a name for your event</label>
                    <input 
                        type="text" 
                        id="name" 
                        placeholder="Enter event name" 
                        required
                        onChange={(e) => setEvent({...event, eventName: e.target.value})}
                    />

                    <label>Specify what type of event you want to create?</label>
                    <div id='eventType'>
                        <label className="radio-label">
                            <input 
                                type="radio" 
                                name="eventType" 
                                value="online"
                                onChange={() => {
                                    setEventType('online');
                                    setEvent({...event, eventType: 'online'});
                                    setShowLocationInput(true);
                                }}
                                required
                            /> 
                            Online
                        </label>
                        <label className="radio-label">
                            <input 
                                type="radio" 
                                name="eventType" 
                                value="inPerson"
                                onChange={() => {
                                    setEventType('inPerson');
                                    setEvent({...event, eventType: 'in person'});
                                    setShowLocationInput(true);
                                }}
                            /> 
                            In Person
                        </label>
                    </div>

                    {showLocationInput && (
                        <>
                            <label htmlFor="where">Where is the event taking place?</label>
                            <input 
                                type="text" 
                                id="where" 
                                placeholder={eventType === 'online' ? "Enter Zoom/Meet link" : "Enter physical address"}
                                required
                                onChange={(e) => setEvent({...event, eventLocate: e.target.value})}
                            />
                        </>
                    )}

                    <label htmlFor="when">When is the event taking place?</label>
                    <input 
                        type="datetime-local" 
                        id="when" 
                        name="starTime"
                        min={checkTime()}
                        required
                        onChange={(e) => setEvent({...event, eventDate: e.target.value})}
                    />

                    <label htmlFor="length">How long is the event?</label>
                    <input 
                        type="text" 
                        id="length" 
                        placeholder="e.g. 3 hours"
                        required
                        onChange={(e) => setEvent({...event, eventLength: e.target.value})}
                    />

                    <button type="submit">Next: Add Guests</button>
                </form>
            )}

            {showInvites && (
                <form onSubmit={addGuests}>
                    <label htmlFor="people">
                        Enter the names and emails of all the people who are invited
                    </label>
                    <br />
                    <input 
                        type="text" 
                        placeholder='name' 
                        id="name" 
                        onChange={(e) => setName(e.target.value)}
                    />
                    <input 
                        type="email" 
                        placeholder='email' 
                        id="email" 
                        onChange={(e) => setEmail(e.target.value)}
                    />
                    <button type="submit">Add Guest</button>
                    {list}
                    <button type="button" onClick={endEvent}>Finish Creating Event</button>
                </form>
            )}
        </div>
    );
};

export default Event_create;