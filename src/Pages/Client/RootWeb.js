import React, { useEffect } from 'react'
import { ThemeProvider } from "./Context";
import App from './App';
import { useParams } from 'react-router-dom';

export default function RootWeb() {

   const [user, setUser] = React.useState(null);

  const { idcatalogo } = useParams();
  //console.log(useParams());

  useEffect(() => {
    async function fetchData() {
      //console.log(idcatalogo);
      const response = await fetch(`http://localhost:8080/c/${idcatalogo}`);
      const data = await response.json();
      //console.log(data);
      setUser(data);
      //console.log("hola");
    }
    fetchData();
  }, [idcatalogo])


  return (
    <ThemeProvider>
      {
        user && <App user={user} />
      }
    </ThemeProvider>
  )
}
