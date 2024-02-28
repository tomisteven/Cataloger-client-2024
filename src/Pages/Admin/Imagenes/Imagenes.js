import React from "react";
import "../index.css";
import "./Imagenes.css";
import { Button, Icon } from "semantic-ui-react";
import axios from "axios";
import { toast, ToastContainer } from "react-toastify";

export function Imagenes({ user, token, refresh}) {
  const [loading, setLoading] = React.useState(false);
  const [newImageLogo, setNewImageLogo] = React.useState(null);
  const [newImagePrincipal, setNewImagePrincipal] = React.useState(null);

  React.useEffect(() => {
      setNewImageLogo(null)
      setNewImagePrincipal(null)
  }, [refresh])

  const createURL = (img) => {
    if (img instanceof Blob || img instanceof File) {
      return URL.createObjectURL(img);
    } else if (typeof img === "string") {
      return img;
    } else {
      return;
    }
  };

  const clearImg = (t) => {
    if (t) {
      setNewImageLogo(null);
    } else {
      setNewImagePrincipal(null);
    }
  };

  const saveImg = async (type, image) => {
    if (image) {
      setLoading(true);
      const endpoint = "http://localhost:8080/update";
      const data = type === "logo" ? { logoImg: image } : { imgSectionOne: image };

      try {
        const res = await axios.patch(endpoint, data, {
          headers: {
            "Content-Type": "multipart/form-data",
            Authorization: token,
          },
        });
        console.log(res);
      } catch (error) {
        console.error("Error saving image:", error);
      } finally {
        clearImg(type === "logo" ? true : false);
        refresh()
        setLoading(false);
        toast.success("Imagen guardada con éxito");
      }
    }
  };

  //console.log(user);
  return (
    <div className="pages-admin-contenedor-principal">
      <h1 className="title-images">Imagenes principales de la web</h1>

      <div className="cont-imagenes">
        <div className="cont-img-logo">
          <p
            style={
              newImagePrincipal
                ? {
                    color: "black",
                    fontWeight: "bold",
                    backgroundColor: "yellow",
                    padding: "5px",
                    borderRadius: "5px",
                  }
                : {
                    display: "none",
                  }
            }
          >
            Nueva Imagen
          </p>

            <img
              className="img-preview-1"
              src={
                newImagePrincipal
                  ? createURL(newImagePrincipal)
                  : user.imgSectionOne
              }
              alt=""
            />

          <input
            className="input-file-1"
            type="file"
            id=""
            onChange={(e) => {
              setNewImagePrincipal(e.target.files[0]);
            }}
          />
          <label className="input-file-label" htmlFor="">
            Seleccionar Archivo
          </label>

          <div class="cont-info-logo">
            <p>
              Imagen principal de la web, se recomienda que sea de 1920 x 1080
            </p>
          </div>
          <div className="cont-button-save">
            <Button
              onClick={() => {
                saveImg("", newImagePrincipal);
              }}
              className="btn-save"
              type="submit"
              disabled={newImagePrincipal === null}
              color="purple"
            >
              Guardar
            </Button>
            <Button
              onClick={() => {
                clearImg();
              }}
              className="btn-save"
              type="submit"
              color="red"
              disabled={newImagePrincipal === null}
            >
              Cancelar
            </Button>
          </div>
        </div>
        <div className="cont-img-principal">
          <p
            style={
              newImageLogo
                ? {
                    color: "black",
                    fontWeight: "bold",
                    backgroundColor: "yellow",
                    padding: "5px",
                    borderRadius: "5px",
                  }
                : {
                    display: "none",
                  }
            }
          >
            Nueva Imagen
          </p>

            <img
              className="img-preview-1"
              src={newImageLogo ? createURL(newImageLogo) : user.logoImg}
              alt=""
            />

          <input
            className="input-file-1"
            type="file"
            id=""
            onChange={(e) => {
              setNewImageLogo(e.target.files[0]);
            }}
          />
          <label className="input-file-label" htmlFor="">
            Seleccionar Archivo
          </label>
          <div class="cont-info-logo">
            <p>Logo de la web, se recomienda que sea de 200 x 200</p>
          </div>
          <div className="cont-button-save">
            <Button
              onClick={() => {
                saveImg("logo", newImageLogo);
              }}
              className="btn-save"
              type="submit"
              color="purple"
              disabled={newImageLogo === null}
            >
              {
                loading ? <Icon
                loading
                name='spinner'
                />
                : "Guardar"
              }
            </Button>
            <Button
              onClick={() => {
                console.log("click");
              }}
              className="btn-save"
              type="submit"
              color="red"
              disabled={newImageLogo === null}
            >
              Cancelar
            </Button>
          </div>
        </div>
      </div>
      <ToastContainer />
    </div>
  );
}
