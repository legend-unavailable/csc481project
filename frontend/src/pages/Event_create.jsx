import { useState, useEffect } from "react"; // Added useEffect import
import { useNavigate } from "react-router-dom";
import "../styles/Event_create.css";//Eliabeth added 
import axios from "axios";

const SuccessAlert = ({ message, onClose }) => (
    <div className="success-alert">
        <h2>{message}</h2>
        <button onClick={onClose}>OK</button>
    </div>
);

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

    // New states for database integration
    const [availableUsers, setAvailableUsers] = useState([]);
    const [isOrganizer, setIsOrganizer] = useState(false);

    // Check if user is organizer and fetch available users
    useEffect(() => {
        const currentUser = JSON.parse(localStorage.getItem('currentUser'));
        
        // Check if user is organizer
        const checkOrganizer = async () => {
            try {
                const response = await axios.get(`http://localhost:3001/api/check-organizer/${currentUser.user_id}`);
                setIsOrganizer(response.data.isOrganizer);
                if (!response.data.isOrganizer) {
                    alert('Only organizers can create events');
                    navigate('/home');
                }
            } catch (error) {
                console.error('Error:', error);
                navigate('/home');
            }
        };

        // Get all users for invites
        const fetchUsers = async () => {
            try {
                const response = await axios.get('http://localhost:3001/api/users');
                setAvailableUsers(response.data);
            } catch (error) {
                console.error('Error:', error);
            }
        };

        checkOrganizer();
        fetchUsers();
    }, [navigate]);

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
     // Modified addGuests to verify against database users
    const addGuests = (e) => {
       e.preventDefault();
       const userExists = availableUsers.find(user => user.email === email);
       if (userExists) {
           setGuests([...guests, {
               user_id: userExists.user_id,
               name: `${userExists.first_name} ${userExists.last_name}`,
               email: userExists.email
           }]);
           document.getElementById('name').value = '';
           document.getElementById("email").value = "";
           setName('');
           setEmail('');
       } else {
           alert('User not found in system');
       }
    };

    // Modified endEvent to use new API endpoint
    const endEvent = async() => {
        const currentUser = JSON.parse(localStorage.getItem('currentUser'));
        try {
            const response = await axios.post('http://localhost:3001/api/create-event', {
                event: {...event, organizerId: currentUser.user_id},
                guests
            });
            alert('Event created successfully!');
            navigate('/home');
        } catch (error) {
            console.error('Error creating event:', error);
            alert('Failed to create event');
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
                Name: {guest.name} | Email: {guest.email}
                <br />
            </li>
        ))
    );

    return (
        <div className="event-container">
            {/* Your existing form JSX stays exactly the same */}
            {showForm && (
                <form onSubmit={handleFirstFormSubmit}>
                    {/* All your existing form fields remain the same */}
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