import React from "react";
import { Button, Form, Modal, Icon } from "semantic-ui-react";
import "./modalCss.css";
import axios from "axios";
import { toast } from "react-toastify";

export default function ModalEdit({
  open,
  setOpen,
  clear,
  edit,
  productEdit,
  refresh,
  accessToken,
  setLoading,
  loading,
}) {
  const [formEdit, setFormEdit] = React.useState({
    name: '',
    description: '',
    price: '',
    stock: '',
  });
  const [images, setImages] = React.useState([]);

  const updateProduct = async (values) => {
    const newProduct = {
      name: values.name,
      description: values.description,
      price: values.price,
      stock: values.stock,
      img1: images[0],
      img2: images[1],
    };

    console.log(newProduct);

    const url = `http://localhost:8080/product/update/${productEdit._id}`;

    const config = {
      headers: {
        "Content-Type": "multipart/form-data",
        Authorization: accessToken,
      },
    };

    try {
      setLoading(true);
      const res = await axios.patch(url, newProduct, config);

      if (res.status === 200) {
        toast.success("Producto actualizado con éxito");
        setOpen(false);
        clear();
        window.location.reload();
      } else if (res.status === 400) {
        toast.error("Error al actualizar el producto");
      }
    } catch (err) {
      console.error(err);
    }
  };

  const saveImages = (name, file) => {
    setImages((prevImages) => {
      const updatedImages = [...prevImages];
      updatedImages[name === "file1" ? 0 : 1] = file;
      return updatedImages;
    });
  };

  const createURL = (img) => {
    if (img instanceof Blob || img instanceof File) {
      return URL.createObjectURL(img);
    } else if (typeof img === "string") {
      // Assuming img is a URL string
      return img;
    } else {
      // Default URL or handle other cases accordingly
      return "https://cdn-icons-png.flaticon.com/512/1598/1598638.png";
    }
  };

  React.useEffect(() => {
    if (edit && productEdit.image) {
      // Set images initially
      setImages([
        productEdit.image[0] ? productEdit.image[0].url : null,
        productEdit.image[1] ? productEdit.image[1].url : null,
      ]);

      // Set form data with default values
      setFormEdit({
        name: productEdit.name || '',
        description: productEdit.description || '',
        price: productEdit.price || '',
        stock: productEdit.stock || '',
      });
    }
  }, [productEdit, edit]);

  return (
    <>
      <Modal
        dimmer="blurring"
        closeOnDimmerClick={false}
        size="small"
        onClose={() => setOpen(false)}
        onOpen={() => setOpen(true)}
        open={open}
      >
        <Modal.Header>
          Edita el producto{" "}
          <span
            style={{
              color: "blue",
              fontWeight: "bold",
            }}
          >
            {productEdit.name}
          </span>
        </Modal.Header>

        <Modal.Content>
          <Modal.Description>
            <Form>
              <Form.Group widths="2">
                <Form.Input
                  fluid
                  label="Nombre"
                  placeholder="Nombre"
                  value={formEdit.name}
                  onChange={(e) => {
                    setFormEdit({
                      ...formEdit,
                      name: e.target.value,
                    });
                  }}
                />
                <Form.Input
                  fluid
                  label="Stock"
                  placeholder="Stock"
                  value={formEdit.stock}
                  onChange={(e) => {
                    setFormEdit({
                      ...formEdit,
                      stock: e.target.value,
                    });
                  }}
                />
                <Form.Input
                  fluid
                  label="Precio"
                  placeholder="Precio"
                  value={formEdit.price}
                  onChange={(e) => {
                    setFormEdit({
                      ...formEdit,
                      price: e.target.value,
                    });
                  }}
                />
              </Form.Group>
              <Form.Group widths="equal">
                <Form.Input
                  fluid
                  label="Descripción"
                  placeholder="Descripción"
                  value={formEdit.description}
                  onChange={(e) => {
                    setFormEdit({
                      ...formEdit,
                      description: e.target.value,
                    });
                  }}
                />
              </Form.Group>
              <div
                className="imagenes-modal"
                style={{
                  display: "flex",
                  justifyContent: "space-between",
                  alignItems: "center",
                }}
              ></div>
              {[0, 1].map((index) => (
                <div
                  key={index}
                  className="cont-agregar-productos-formulario-item-5"
                >
                  <div className="cont-img-preview">
                    <input
                      className="input-file"
                      type="file"
                      name={`file${index + 1}`}
                      onChange={(e) =>
                        saveImages(`file${index + 1}`, e.target.files[0])
                      }
                      id=""
                    />
                    <label className="input-file-label" htmlFor="">
                      Seleccionar Archivo
                    </label>
                    <img
                      className="img-preview"
                      src={createURL(images[index])}
                      alt=""
                    />
                  </div>
                </div>
              ))}
            </Form>
          </Modal.Description>
        </Modal.Content>
        <Modal.Actions>
          <Button
            color="red"
            onClick={() => {
              setOpen(false);
              clear();
            }}
          >
            Cancelar
          </Button>
          <Button
            content={"Editar Producto"}
            labelPosition="right"
            icon={
              loading ? (
                <Icon loading name="spinner" />
              ) : (
                <Icon name="checkmark" />
              )
            }
            onClick={() => {
              updateProduct(formEdit);
            }}
            positive
          />
        </Modal.Actions>
      </Modal>
    </>
  );
}
