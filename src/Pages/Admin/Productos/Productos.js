import React from "react";
import "../index.css";
import "./Productos.css";
import { Button, Icon } from "semantic-ui-react";
import ContAgregarProductos from "./ContAgregarProductos";
import { ProductosAPI } from "../../../api/productos";
import ModalEdit from "./ModalEdit";
import Swal from "sweetalert2";

const productsController = new ProductosAPI();

export function Productos({ user, refresh, token }) {
  const [state, setState] = React.useState(false);
  const [edit, setEdit] = React.useState(false);
  const [productEdit, setProductEdit] = React.useState({}); //creamos el estado de datos del usuario [
  const [products, setProducts] = React.useState([]);
  const [loading, setLoading] = React.useState(false);
  const [open, setOpen] = React.useState(false);

  const onChange = () => {
    setState(!state);
  };

  const clear = () => {
    setEdit(false);
    setProductEdit({});
  };

  React.useEffect(() => {
    setLoading(true);
    console.log("loading");
    async function fetchData() {
      const response = await productsController.getProducts(token);
      console.log(response);
      setProducts(response);
    }

    fetchData();
    setLoading(false);
    console.log("loading false");
  }, [state, token]);

  return (
    <div className="pages-admin-contenedor-principal">
      <div class="contenedor-productos">
        <ContAgregarProductos
          refresh={onChange}
          edit={edit}
          productEdit={productEdit}
        />
        <div class="cont-lista-productos">
          {loading ? (
            <div class="cont-loading">
              <div class="ui active centered inline loader"></div>
            </div>
          ) : products.length > 0 ? (
            products.map((product) => (
              <ImageProduct
                $key={product._id}
                product={product}
                onChange={onChange}
                setProductEdit={setProductEdit}
                setEdit={setEdit}
                setOpen={setOpen}
                refresh={onChange}
                accessToken={token}
                setLoading={setLoading}
                loading={loading}
              />
            ))
          ) : (
            <div class="cont-loading">
              <h3>Todavia no hay productos</h3>
            </div>
          )}
        </div>
      </div>
      <ModalEdit
        open={open}
        setOpen={setOpen}
        productEdit={productEdit}
        edit={edit}
        clear={clear}
        refresh={onChange}
        accessToken={token}
            setLoading={setLoading}
            loading={loading}
      />
    </div>
  );
}

const ImageProduct = ({ product, setProductEdit, setEdit, setOpen, $key,
  refresh, accessToken, setLoading, loading
}) => {
  const [imagesLoaded, setImagesLoaded] = React.useState(false);
  const [urlImage, setUrlImage] = React.useState(product.image[0].url);

  const handleImageLoad = () => {
    setImagesLoaded(true);
  };

  const nextImage = (img) => {
    setUrlImage(product.image[img].url);
    setImagesLoaded(false);
  };

  const prevImage = (img) => {
    setUrlImage(product.image[img].url);
    setImagesLoaded(false);
  };

  const openModalToEdit = () => {
    setProductEdit(product);
    setEdit(true);
    setOpen(true);
  };


  const onClickDelete  = async (product) => {
    Swal.fire({
      title: `Desea eliminar el producto: ${product.name}?`,
      showDenyButton: true,
      showCancelButton: true,
      confirmButtonText: "Eliminar",
      denyButtonText: `Cancelar`
    }).then((result) => {
      if (result.isConfirmed) {
        setLoading(true);
        productsController.deleteProduct(accessToken, product._id).then((res) => {
          if (res.ok) {
            refresh();
            Swal.fire("Eliminado!", "", "success");
          } else {
            Swal.fire("Error!", "", "error");
          }
          setLoading(false);
        });
      } else if (result.isDenied) {
        Swal.fire("Operacion Cancelada", "", "info");
      }
    });
  };

  return (
    <div className="cont-product" key={$key}>
      <div className="cont-img">
        <img
          src={
            imagesLoaded
              ? urlImage
              : "https://react.semantic-ui.com/images/wireframe/image.png"
          }
          alt=""
          onLoad={handleImageLoad}
        />
      </div>
      {imagesLoaded ? (
        <div className="cont-info">
          <div className="cont-info1">
            <div className="cont-name">{product.name.toUpperCase()}</div>
            <div className="cont-description">{product.description}</div>
            <div className="cont-rating">
              <Icon name="star" color="orange" />
              <Icon name="star" color="orange" />
              <Icon name="star" color="orange" />
              <Icon name="star" color="orange" />
              <Icon name="star" color="orange" />
            </div>
          </div>
          <div className="cont-info2">
            <div className="cont-price">
              <h3>${product.price}</h3>
            </div>
            <div className="cont-stock">
              <h3>STOCK: {product.stock}</h3>
            </div>
          </div>
          <div className="cont-info3">
            <div className="cont-buttons">
              <Button
                onClick={() => {
                  openModalToEdit();
                }}
                size="mini"
                color="green"
              >
                Editar
              </Button>
              <Button size="mini" color="red" onClick={
                () => onClickDelete(product)
              }>
                Eliminar
              </Button>
            </div>
            <div className="cont-images">
              <div className="cont-images-prev">
                <Icon
                  disabled={urlImage === product.image[0].url}
                  size="large"
                  name="arrow alternate circle left"
                  onClick={() => prevImage(0)}
                />
              </div>
              <div className="cont-images-next">
                <Icon
                  disabled={
                    urlImage === product.image[product.image.length - 1].url
                  }
                  size="large"
                  name="arrow alternate circle right"
                  onClick={() => nextImage(1)}
                />
              </div>
            </div>
          </div>
        </div>
      ) : (
        <div className="cont-loading">
          <div class="ui active centered inline loader"></div>
        </div>
      )}
    </div>
  );
};
