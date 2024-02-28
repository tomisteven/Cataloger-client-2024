import React from "react";
import { Routes, Route } from "react-router-dom";
import {WebPrincipal} from "../Pages/Cataloger";


//WEB DE CATALOGER
export function WebRoutes() {


  return (
    <Routes>
      <Route path="/" element={<WebPrincipal />} />
    </Routes>
  );
}