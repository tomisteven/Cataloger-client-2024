import React, { useEffect } from "react";
import { Routes, Route } from "react-router-dom";
//import {map} from "lodash"
import { DatosPersonales } from "../Pages/Admin/DatosPersonales";
import { Contacto } from "../Pages/Admin/Contacto";
import { PieDePagina } from "../Pages/Admin/piePagina";
import { Imagenes } from "../Pages/Admin/Imagenes";
import { Estilos } from "../Pages/Admin/estilos";
import { AdminLayout } from "../Layouts";
import { useAuth } from "../hooks/useAuth";
import Auth from "../Pages/Auth/Auth";
import { DatosNegocio } from "../Pages/Admin/DatosNegocio";
import { User } from "../api/user.js";
import { Productos } from "../Pages/Admin/Productos/Productos.js";

//si el usuario esta logeado y es admin, entonces se le muestra el layout de admin

const userController = new User();

export function AdminRoutes() {
  const { accessToken, user } = useAuth(); //obtenemos el usuario logueado del contexto de autenticacion
  const [onChange, setOnChange] = React.useState(false);
  const [dataUser, setData] = React.useState(user); //creamos el estado de datos del usuario [

  useEffect(() => {
    (async () => {
      //obtenemos los datos del usuario
      const response = await userController.getUser(accessToken);
      console.log(response);
      //si la respuesta es correcta eliminamos la contraseña del usuario
      delete response.password;
      //guardamos el usuario en el estado
      setData(response);
    })();
  }, [onChange, accessToken]);

  const refresh = (e) => {
    setOnChange(!onChange);
    console.log(onChange);
  };
  //obtenemos el usuario logueado del contexto de autenticacion

  const loadLayout = (Layout, Page) => {
    return (
      <Layout>
        <Page refresh={refresh} status={onChange} user={dataUser} token={accessToken} />
      </Layout>
    );
  };

  if (
    !user ||
    typeof user === "undefined" ||
    user.message === "Token expirado" ||
    user.message === "Token invalido"
  ) {
    return (
      <Routes>
        <Route path="/admin/*" element={<Auth />} />
      </Routes>
    );
  }

  return (
    <Routes>
      {!user ? (
        <Route path="/admin/*" element={<Auth />} />
      ) : (
        <>
          <Route
            path="/admin/datos-negocio"
            element={loadLayout(AdminLayout, DatosNegocio)}
          />
          <Route
            path="/admin/productos"
            element={loadLayout(AdminLayout, Productos)}
          />
          <Route
            path="/admin/imagenes"
            element={loadLayout(AdminLayout, Imagenes)}
          />
          <Route
            path="/admin/estilos"
            element={loadLayout(AdminLayout, Estilos)}
          />
          <Route
            path="/admin/pie-de-pagina"
            element={loadLayout(AdminLayout, PieDePagina)}
          />
          <Route
            path="/admin/contacto"
            element={loadLayout(AdminLayout, Contacto)}
          />
          <Route
            path="/admin/datos-personales"
            element={loadLayout(AdminLayout, DatosPersonales)}
          />
        </>
      )}
    </Routes>
  );
}
