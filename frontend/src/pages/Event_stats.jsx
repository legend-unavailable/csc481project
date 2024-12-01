import axios from "axios";
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