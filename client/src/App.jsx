import { useEffect, useState } from 'react';
import axios from 'axios';

function App() {
  const [data, setData] = useState(null);

  useEffect(() => {
    // Reemplaza fetch con axios
    axios.get(`${import.meta.env.VITE_API_URL}/api/test`)
      .then(response => {
        console.log(response); // Verifica la respuesta completa
        setData(response.data); // Axios ya convierte la respuesta a JSON
      })
      .catch(error => console.error('Error fetching data:', error));
  }, []);

  return (
    <div>
      <h1>React and Node.js Integration</h1>
      {data ? <p>{data.message}</p> : <p>Loading...</p>}
    </div>
  );
}

export default App;