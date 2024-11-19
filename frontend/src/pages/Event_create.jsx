import { useState } from "react";

const Event_create = () => {
    const [showInvites, setShowInvites] = useState(false);
    const [showList, setShowList] = useState(false);
    const [showForm, setShowForm] = useState(true);

    const [name, setName] = useState();
    const [email, setEmail] = useState();
    const [guests, setGuests] = useState([{name: 'bob', email: 'bob@wahoo.com'}]);

    const dblSpace = <><br /><br /></>;

    const addGuests = (event) => {
        event.preventDefault();
        setGuests(guests => [...guests, {name: name, email: email}]);
        if (guests.length > 0 || showList === true) {
            setShowList(true);
            for (let index = 0; index < guests.length; index++) {
                console.log(guests.at(index));
                
                
            }
        };

    }
    const events = [];
    const list = guests.map(guest => {
        let id = 0
        return(
            <li key={id++}>Name: {guest.name} | Email: {guest.email} <br /></li>
        )
    });
    const hide = (event) => {
        setShowForm(false);
        setShowInvites(true);
    };
    return (
      <>
        {showForm && (
            <form onSubmit={hide}>
              <label htmlFor="name">Enter a name for your event?</label>
              <br />
              <input type="text" required />
              {dblSpace}

              <label htmlFor="type">
                Specify what type of event you want to create?
              </label>
              <div id="eventType">
                <input type="radio" name="eType" id="1" required /> Online
                <input type="radio" name="eType" id="2" required/>
                In Person
              </div>
              <br />

              <label htmlFor="where">Where is the event taking place?</label>
              <br />
              <input type="text" placeholder="e.g. Zoom" required />
              {dblSpace}

              <label htmlFor="when">When is the event taking place?</label>
              <br />
              <input type="datetime-local" name="starTime" required />
              {dblSpace}

              <label htmlFor="length">How long is the event?</label>
              <br />
              <input type="text" placeholder="e.g. 3 hours" required />
              {dblSpace}

              <button type="submit">Create Event</button>
            </form>
        )}
        {showInvites && (
            <form onSubmit={addGuests}>
              <label htmlFor="people">
                Enter the names and emails of all the people who are invited
              </label>
              <br />
              <input type="text" placeholder='name' id="name" onChange={(e) => setName(e.target.value)} name="names" required />
              <input type="email" placeholder='email' id="email" onChange={(e) => setEmail(e.target.value)} name="guests" required />
              <button>Add</button>
              {showList && list}
            </form>
        )}
      </>
    );
}
export default Event_create