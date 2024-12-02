import axios from "axios";
import { useState } from "react";
<<<<<<< HEAD
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
=======
import { useNavigate } from "react-router-dom";

const Event_create = () => {
    //switch values when finished
    const [showInvites, setShowInvites] = useState(false);
    const [showForm, setShowForm] = useState(true);
    const navigate = useNavigate();

    const [name, setName] = useState();
    const [email, setEmail] = useState();
    const [guests, setGuests] = useState([]);
    const [event, setEvent] = useState();

    const dblSpace = <><br /><br /></>;

    const addGuests = (event) => {
        event.preventDefault();
        setGuests([...guests, {name: name, email: email}]);
        document.getElementById('name').value = '';
        document.getElementById("email").value = "";
    }

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

    const checkTime = () => {
      const todayDate = new Date();
      const daysInCurrentMonth = new Date(todayDate.getFullYear(), todayDate.getMonth(), 0).getDate();
      let minDay, minMonth, minYear;

      if (todayDate.getDate()+3 > daysInCurrentMonth) {
        minDay = todayDate.getDate() + 3 - daysInCurrentMonth;
        if (todayDate.getMonth() === 12) {
          minMonth = 1;
          minYear = todayDate.getFullYear() + 1;
        }
        else {
          minMonth = todayDate.getMonth() + 2;
          minYear = todayDate.getFullYear(); 
        }

      }
      else {
        minDay = todayDate.getDate() + 3;
        minMonth = todayDate.getMonth() + 1;
        minYear = todayDate.getFullYear();
      }

      if (minMonth < 10) {minMonth = `0${minMonth}`;}
      if (minDay < 10) {minDay = `0${minDay}`;}

      const minDate = `${minYear}-${minMonth}-${minDay}T00:00`;
      console.log(minDate);
      return minDate;
      //2019-02-18T12:00     
    }

    const endEvent = async() => {
      setEvent({...event, guests: guests});
      try {
        await axios.post('http://localhost:3000/eCreate', {event});
      } catch (error) {
        console.log(event);
      }

      navigate('/home');
    }

    const hide = () => {
      setShowForm(false);
      setShowInvites(true);
      console.log(event);
        
    };
    return (
      <>
        {showForm && (
            <form onSubmit={hide} method="POST">
              <label htmlFor="name">Enter a name for your event?</label>
              <br />
              <input type="text" id="eName"required onChange={(e) => setEvent({...event, eventName: e.target.value})}/>
              {dblSpace}

              <label htmlFor="type">
                Specify what type of event you want to create?
              </label>
              <div id="eventType">
                <input type="radio" name="eType" value='1' required onChange={() => setEvent({...event, eventType: 'online'})}/> Online
                <input type="radio" name="eType" value="2" required onChange={() => setEvent({...event, eventType: 'in person'})}/>
                In Person
              </div>
              <br />

              <label htmlFor="where">Where is the event taking place?</label>
              <br />
              <input type="text" id='eLocate' placeholder="e.g. Zoom" required onChange={(e) => setEvent({...event, eventLocate: e.target.value})}/>
              {dblSpace}

              <label htmlFor="when">When is the event taking place?<br /> Note that at the earliest, events can be scheduled in 3 days from today</label>
              <br />
              <input type="datetime-local" id='eDate' min={checkTime()} name="starTime" required onChange={(e) => setEvent({...event, eventDate: e.target.value})}/>
              {dblSpace}

              <label htmlFor="length">How long is the event?</label>
              <br />
              <input type="text" id='eLength' placeholder="e.g. 3 hours" required onChange={(e) => setEvent({...event, eventLength: e.target.value})}/>
              {dblSpace}

              <button type="submit">Create Event</button>
            </form>
        )}
        {showInvites && (
            <form onSubmit={addGuests} action="POST">
              <label htmlFor="people">
                Enter the names and emails of all the people who are invited
              </label>
              <br />
              <input type="text" placeholder='name' id="name" onChange={(e) => setName(e.target.value)} name="names"  />
              <input type="email" placeholder='email' id="email" onChange={(e) => setEmail(e.target.value)} name="guests"   />
              <button type="submit">Add</button>
              {list}
              <button onClick={endEvent}>Finished</button>
            </form>
        )}
      </>
>>>>>>> 9509d615a3504a1b6422e0abdbe5a6a03423c07c
    );
}

export default Event_create;