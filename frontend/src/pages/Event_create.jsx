import { useState } from "react";

const Event_create = () => {
    const [showInvites, setShowInvites] = useState(false);
    const [showList, setShowList] = useState(false);
    const [showForm, setShowForm] = useState(true);

    const dblSpace = <><br /><br /></>;

    const addGuests = (event) => {
        event.preventDefault();
        

    }
    const guests = [{name: 'bob', email: 'bob@wahoo.com'}];
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
        event.
    }
    return (
      <>
        <form>
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
                <input type="radio" name="opt1" id="" required /> Online
                <input type="radio" name="opt2" id="" />
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
              <input type="text" name="names" required />
              <input type="email" name="guests" required />
              <button>Add</button>
              {showList && list}
            </form>
          )}
        </form>
      </>
    );
}
export default Event_create