import React from 'react'
import { Routes, Route } from "react-router-dom";
import RootWeb from '../Pages/Client/RootWeb';

//WEB DEL CLIENTE
export function ClientWebRoutes() {

  return (
    <Routes>
      <Route path="/cataloger/:idcatalogo" element={<RootWeb />} />
    </Routes>
  );
}
