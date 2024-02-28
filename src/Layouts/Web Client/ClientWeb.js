import React from 'react';
import { useParams } from 'react-router-dom';

const ClientWeb = () => {
  const { idcliente } = useParams();
  const [cliente, setCliente] = React.useState(null);


  React.useEffect(() => {
    // Aquí puedes hacer la petición a la base de datos para obtener la información del cliente
    // y guardarla en el estado cliente
  }, [idcliente]);


  // componentes de la página del cliente
  return (
    <div>
      <h1>Página del cliente {idcliente}</h1>
    </div>
  );
};

export default ClientWeb;
