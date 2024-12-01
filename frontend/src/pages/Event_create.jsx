import axios from "axios";
import { useState } from "react";
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
    );
}
export default Event_create