import React, { useContext } from "react";
import "./Portfolio.css";
import "swiper/css";

import { themeContext } from "../../Context";
const Portfolio = ({ products }) => {
  const theme = useContext(themeContext);
  const darkMode = theme.state.darkMode;

  return (
    <div className="portfolio" id="portfolio">
      {/* heading */}
      <span style={{ color: darkMode ? "white" : "" }}>
        Todos Nuestros Productos
      </span>
      <span>Catalogo</span>

      <div className="cont-div-slider">
        {products.map((product, index) => {
          return (
            <div className="div-slider" key={index}>
              <img
                src={product.image[0].url}
                alt=""
                style={{ width: "100%", height: "100%" }}
              />
              <span className="product-name-slider">{product.name}</span>
              <span>{product.price}</span>
            </div>
          );
        })}
      </div>
      {/* <div className="cont-products">



      </div> */}
    </div>
  );
};

export default Portfolio;
