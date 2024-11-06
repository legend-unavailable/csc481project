import { useState } from "react";

const Event_create = () => {
    const [showOnl, setShowOnl] = useState(false);
    const [showInp, setShowInp] = useState(false);
    const dblSpace = <><br /><br /></>;
    return(
        <>
        <form>
            <label htmlFor="name">Enter a name for your event?</label><br />
            <input type="text" />{dblSpace}

            <label htmlFor="type">Specify what type of event you want to create?</label>
            <div id='eventType'>
                <input type="radio" name="opt1" id="" /> Online
                <input type="radio" name="opt2" id="" />In Person
            </div><br />

            <label htmlFor="where">Where is the event taking place?</label><br />
            {showOnl && <><input type="text" placeholder="e.g. Zoom"/>{dblSpace}</>}
            {showInp && <><input type="text" placeholder="e.g. Zoom"/>{dblSpace}</>}
            

            <label htmlFor="when">When is the event taking place?</label><br />
            <input type="datetime-local" name="starTime" id="" />{dblSpace}

            <label htmlFor="length">How long is the event?</label><br />
            <input type="text" placeholder="e.g. 3 hours"/>{dblSpace}


        </form>
        </>
    );
}
export default Event_create