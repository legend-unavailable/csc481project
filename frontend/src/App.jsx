import { useEffect, useState } from "react";
import Login from "./pages/Login"
import axios from 'axios'

function App() {
  const[response, setResponse] = useState('');
  const fetchAPI = async () => {
    const response = await axios.get('http://localhost:3000/api');
    setResponse(response.data.str);
    console.log(response.data.str);
    
  };

  useEffect(() => {
    fetchAPI();
  }, [])
  return (
    <Login response={response}/>
  )
}

export default App
