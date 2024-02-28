import React, { useState } from "react";
import { useFormik } from "formik";
import { Icon } from "semantic-ui-react";
import { useAuth } from "../../../hooks/useAuth";
import axios from "axios";
import { toast, ToastContainer } from "react-toastify";
import "../index.css";
import "./ContAgregarProductos.css";

export default function ContAgregarProductos({ refresh, edit, productEdit }) {
  const { accessToken } = useAuth();
  const [images, setImages] = useState([]);
  const [loading, setLoading] = useState(false);

  const formik = useFormik({
    initialValues: {
      name: edit ? productEdit.name : "",
      description: edit ? productEdit.description : "",
      price: edit ? productEdit.price : "",
      stock: edit ? productEdit.stock : "",
      image: edit ? productEdit.image : "",
    },
    onSubmit: async (values) => {
      const newProduct = {
        name: values.name,
        description: values.description,
        price: values.price,
        stock: values.stock,
        img: images,
      };

      const url = "http://localhost:8080/product/create";

      const config = {
        headers: {
          "Content-Type": "multipart/form-data",
          Authorization: accessToken,
        },
      };

      try {
        setLoading(true);
        const res = await axios.post(url, newProduct, config);
        setLoading(false);

        if (res.status === 200) {
          formik.resetForm();
          setImages([]);
          refresh();
          toast.success("Producto creado con éxito");
        } else if (res.status === 400) {
          toast.error("Error al crear el producto");
        }
      } catch (err) {
        console.error(err);
      }
    },
  });

  const saveImages = (name, file) => {
    setImages((prevImages) => {
      const updatedImages = [...prevImages];
      updatedImages[name === "file1" ? 0 : 1] = file;
      return updatedImages;
    });
  };

  const createURL = (img) => img ? URL.createObjectURL(img) : "https://cdn-icons-png.flaticon.com/512/1598/1598638.png";

  return (
    <div className="cont-agregar-productos">
      <form className="form-cont" onSubmit={formik.handleSubmit}>
        <div className="cont-agregar-productos-formulario">
          <div className="cont-agregar-productos-formulario-item-1">
            <h5>Nombre del Producto</h5>
            <input
              type="text"
              onChange={formik.handleChange}
              value={formik.values.name}
              name="name"
              placeholder="Nombre del Producto"
            />
          </div>
          <div className="cont-agregar-productos-formulario-item-2">
            <h5>Descripcion</h5>
            <textarea
              name="description"
              onChange={formik.handleChange}
              value={formik.values.description}
              id=""
              cols="20"
              rows="4"
            ></textarea>
          </div>
          <div className="cont-agregar-productos-formulario-item-3">
            <input
              type="text"
              onChange={formik.handleChange}
              value={formik.values.price}
              name="price"
              placeholder="Precio"
            />
            <input
              name="stock"
              onChange={formik.handleChange}
              value={formik.values.stock}
              type="text"
              placeholder="Stock"
            />
          </div>
          <div className="cont-agregar-productos-formulario-item-4">
            <h5>Imagenes</h5>
          </div>
          {[0, 1].map((index) => (
            <div key={index} className="cont-agregar-productos-formulario-item-5">
              <div className="cont-img-preview">
                <input
                  className="input-file"
                  type="file"
                  name={`file${index + 1}`}
                  onChange={(e) => saveImages(`file${index + 1}`, e.target.files[0])}
                  id=""
                />
                <label className="input-file-label" htmlFor="">
                  Seleccionar Archivo
                </label>
                <img className="img-preview" src={createURL(images[index])} alt="" />
              </div>
            </div>
          ))}
          <div className="cont-agregar-productos-formulario-item-6">
            <button type="submit">
              {loading ? (
                <Icon loading name="spinner" />
              ) : (
                "Agregar Producto"
              )}
            </button>
          </div>
        </div>
      </form>
      <ToastContainer />
    </div>
  );
}
