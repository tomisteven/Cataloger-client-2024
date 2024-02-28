import React from "react";
import "../index.css";
import "./DatosNegocio.css";
import { useFormik } from "formik";
import { initialValues } from "./formikConfig.js";
import { ToastContainer, toast } from "react-toastify";
import { useAuth } from "../../../hooks/useAuth";
import { User } from "../../../api/user.js";
import { Icon } from "semantic-ui-react";

const userController = new User();
export function DatosNegocio({user, refresh}) {

  const { accessToken } = useAuth();  //obtenemos el usuario logueado del contexto de autenticacion
  const [loading, setLoading] = React.useState(false);
  //const [dataUser, setData] = React.useState(null); //creamos el estado de datos del usuario [

  const formik = useFormik({
    initialValues: initialValues(user),
    onSubmit: async (formData) => {
       setLoading(true);
      await userController.updatePersonalData(
        accessToken,
        formData
      );
      refresh();
      setLoading(false);
      toast.success("Datos Actualizados Correctamente");
    },
  });

  return (
    <div className="pages-admin-contenedor-principal">
      <div class="contenedor-datos-negocio">
        <div class="datos-negocio-cont1"></div>

        <form
          class="datos-negocio-cont2"
          action="submit"
          onSubmit={formik.handleSubmit}
        >
          <div class="datos-negocio-cont-2-item-1">
            <h5 className="datos-negocio-item-h5">NOMBRE DEL NEGOCIO</h5>
            <input
              className="datos-negocio-item-input"
              type="text"
              placeholder="Nombre del Negocio"
              name="nameShop"
              onChange={formik.handleChange}
              value={formik.values.nameShop}
            />
          </div>
          <div class="datos-negocio-cont-2-item-2">
            <h5 className="datos-negocio-item-h5">DESCRIPCION</h5>

            <textarea
              className="datos-negocio-item-input-area"
              type="text"
              placeholder="Descripcion del Negocio"
              name="description"
              onChange={formik.handleChange}
              value={formik.values.description}
            />
          </div>
          <div class="datos-negocio-cont-2-item-3">
            <h5 className="datos-negocio-item-h5">SLOGAN</h5>
            <input
              className="datos-negocio-item-input"
              type="text"
              placeholder="Slogan"
              name="slogan"
              onChange={formik.handleChange}
              value={formik.values.slogan}
            />{" "}
          </div>
          <div class="datos-negocio-cont-2-item-4">
            <h5 className="datos-negocio-item-h5">FRASE PRESENTACION</h5>
            <textarea
              className="datos-negocio-item-input-area"
              type="text"
              placeholder="Frase Presentacion"
              name="fracePresentacion"
              onChange={formik.handleChange}
              value={formik.values.fracePresentacion}
            />
          </div>
          <div class="datos-negocio-cont-2-item-5">
            <h5 className="datos-negocio-item-h5">UBICACION NEGOCIO</h5>
            <input
              className="datos-negocio-item-input"
              type="text"
              placeholder="Ubicacion Negocio"
              name="ubicacion"
              onChange={formik.handleChange}
              value={formik.values.ubicacion}
            />
            <h5 className="datos-negocio-item-h5">TELEFONO NEGOCIO</h5>
            <input
              className="datos-negocio-item-input"
              type="text"
              placeholder="Telefono Negocio"
              name="celular"
              onChange={formik.handleChange}
              value={formik.values.celular}
            />
          </div>
          <div class="datos-negocio-cont-2-item-6">
            <p className="datos-negocio-cont-2-item-6-text">
              *Los datos anteriores seran reemplazados por los nuevos, no se
              podran volver a reestablecer*
            </p>
            <button onSubmit={formik.handleSubmit} className="button-guardar">
              <h4>{loading ? "Guardando..." : "Actualizar Datos"}</h4>
            </button>
            <button onClick={
              () => {
                window.location.href = "#/admin/productos";
              }
            } className="button-guardar-siguiente">
              <h4>Siguiente Configuracion</h4>
              <Icon className="icon-button" name="arrow right" />
            </button>
          </div>
        </form>
      </div>
      <ToastContainer />
    </div>
  );
}
