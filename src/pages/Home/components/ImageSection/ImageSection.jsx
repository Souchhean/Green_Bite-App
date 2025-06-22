import React from "react";
import "./ImageSection.css";
import Tilt from "react-parallax-tilt";
import { useNavigate } from "react-router-dom";

export const ImageSection = () => {
  const navigate = useNavigate();

  return (
    <>
      <div className="Img-container">
        <Tilt transitionSpeed={1000} scale={1.07} className="Img-card">
          <img
            src={`${process.env.PUBLIC_URL}/assets/images/products-images/broccoli-vegetable8.png`}
            alt="Broccli Vegetables"
            onClick={() => navigate("/product-details/1")}
            width="100%"
          />
          <h3>Broccli Vegetables</h3>
          <span className="notch"></span>
        </Tilt>{" "}
        <Tilt transitionSpeed={1000} scale={1.07} className="Img-card">
          <img
            src={`${process.env.PUBLIC_URL}/assets/images/products-images/carrot.png`}
            alt="Carrot Vegetables"
            onClick={() => navigate("/product-details/2")}
            width="100%"
          />
          <h3>Carrot Vegetables</h3>
          <span className="notch"></span>
        </Tilt>
        <Tilt transitionSpeed={1000} scale={1.07} className="Img-card">
          <img
            src={`${process.env.PUBLIC_URL}/assets/images/products-images/bok-choy-vegetable.png`}
            alt="Bok choy vegetable"
            onClick={() => navigate("/product-details/3")}
            width="100%"
          />
          <h3>Bok choy vegetable</h3>
          <span className="notch"></span>
        </Tilt>
        <Tilt transitionSpeed={1000} scale={1.07} className="Img-card">
          <img
            src={`${process.env.PUBLIC_URL}/assets/images/products-images/eggplant-vegetable.png`}
            alt="eggplant vegetables"
            onClick={() => navigate("/product-details/4")}
            width="100%"
          />
          <h3>eggplant vegetables</h3>
          <span className="notch"></span>
        </Tilt>
      </div>
    </>
  );
};
