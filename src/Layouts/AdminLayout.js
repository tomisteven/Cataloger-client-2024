import React, { useState, Suspense, useMemo, useCallback, useEffect } from "react";
import "./AdminLayout.css";
import { Icon } from "semantic-ui-react";
import { useAuth } from "../hooks/useAuth";

export function AdminLayout(props) {
  const { user } = useAuth();
  const [pathActive, setPathActive] = useState(getCurrentPath());

  useEffect(() => {
    setPathActive(getCurrentPath());
    console.log("cambio de ruta");
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [window.location.href]);


  function getCurrentPath() {
    return window.location.href.split("/")[5];
  }

  const handleNavLinkClick = useCallback((path) => {
    console.log(path);
    setPathActive(path);
  }, []);

  const handleCatalogButtonClick = useCallback(() => {
    localStorage.setItem("idcatalogo", user._id);
    window.location.href = "/#/cataloger/" + user._id;
  }, [user._id]);

  const memoizedChildren = useMemo(() => props.children, [props.children]);

  return (
    <div>
      <Suspense fallback={<div>Loading...</div>}>
        <header className="bg-white shadow-lg h-20 hidden md:flex border">
          <a
            href="dd"
            className="border flex-shrink-0 flex items-center justify-center px-4 lg:px-6 xl:px-8"
          >
            <img
              className="header-logo"
              src="https://res.cloudinary.com/dk0x8gavc/image/upload/v1701282863/Captura_de_pantalla_2023-11-29_152711-removebg-preview_swpcsm.png"
              alt=""
            />
          </a>
          <nav className="header-links contents font-semibold text-base lg:text-lg">
            <ul className="flex items-center ml-4 xl:ml-8 mr-auto">
              <li
                className={
                  pathActive === "datos-negocio"
                    ? "header-item p-3 xl:p-6 active"
                    : "header-item p-3 xl:p-6"
                }
              >
                <a
                  href="#/admin/datos-negocio"
                  onClick={() => {
                    handleNavLinkClick("datos-negocio");
                  }}
                >
                  <span>Datos Negocio</span>
                </a>
              </li>
              <li
                className={
                  pathActive === "productos"
                    ? "header-item p-3 xl:p-6 active"
                    : "header-item p-3 xl:p-6"
                }
              >
                <a
                  href="#/admin/productos"
                  onClick={() => {
                    handleNavLinkClick("productos");
                  }}
                >
                  <span>Productos</span>
                </a>
              </li>
              <li
                className={
                  pathActive === "imagenes"
                    ? "header-item p-3 xl:p-6 active"
                    : "header-item p-3 xl:p-6"
                }
              >
                <a
                  href="#/admin/imagenes"
                  onClick={() => {
                    handleNavLinkClick("imagenes");
                  }}
                >
                  <span>Imagenes</span>
                </a>
              </li>
              <li
                className={
                  pathActive === "estilos"
                    ? "header-item p-3 xl:p-6 active"
                    : "header-item p-3 xl:p-6"
                }
              >
                <a

                  href="#/admin/estilos"
                  onClick={() => {
                    handleNavLinkClick("estilos");
                  }}
                >
                  <span>Estilos</span>
                </a>
              </li>
              <li
                className={
                  pathActive === "pie-de-pagina"
                    ? "header-item p-3 xl:p-6 active"
                    : "header-item p-3 xl:p-6"
                }
              >
                <a
                  href="#/admin/pie-de-pagina"
                  onClick={() => {
                    handleNavLinkClick("pie-de-pagina");
                  }}
                >
                  <span>Pie de Pagina</span>
                </a>
              </li>
              <li
                className={
                  pathActive === "contacto"
                    ? "header-item p-3 xl:p-6 active"
                    : "header-item p-3 xl:p-6"
                }
              >
                <a
                  href="#/admin/contacto"
                  onClick={() => {
                    handleNavLinkClick("contacto");
                  }}
                >
                  <span>Contacto</span>
                </a>
              </li>
              <li
                className={
                  pathActive === "datos-personales"
                    ? "header-item p-3 xl:p-6 active"
                    : "header-item p-3 xl:p-6"
                }
              >
                <a
                  href="#/admin/datos-personales"
                  onClick={() => {
                    handleNavLinkClick("datos-personales");
                  }}
                >
                  <span>Datos Personales</span>
                </a>
              </li>

            </ul>
          </nav>
          <nav className="hidden xl:contents">
            <ul className="flex items-center mr-4 lg:mr-6 xl:mr-8">
              <li className="p-1">
                <Icon name="instagram" circular />
              </li>
              <li className="p-1">
                <Icon name="whatsapp" circular />
              </li>
              <li className="p-1">
                <Icon name="mail" circular />
              </li>
            </ul>
          </nav>
          <div className="border flex items-center px-4 lg:px-6 xl:px-8">
            <button
              onClick={handleCatalogButtonClick}
              className="header-btn-verweb hover:bg-gray-700 text-white font-bold px-4 xl:px-6 py-2 xl:py-3 rounded"
            >
              Ver Mi Catalogo
            </button>
          </div>
        </header>
        {memoizedChildren}
      </Suspense>
    </div>
  );
}
