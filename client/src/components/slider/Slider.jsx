import React, { useState } from "react";
import "./style.scss";

const Slider = ({ images }) => {
  const [imageIndex, setImageIndex] = useState(null);
  let n = images.length;
  return (
    <div className="slider">
      {imageIndex !== null && (
        <div className="fullSlider">
          <div className="arrow scale">
            <img
              src="/arrow.png"
              alt=""
              onClick={() => setImageIndex((prev) => (n + prev - 1) % n)}
            ></img>
          </div>
          <div className="imgContainer">
            <img src={images[imageIndex]}></img>
          </div>
          <div className="arrow scale">
            <img
              src="/arrow.png"
              alt=""
              className="right"
              onClick={() => setImageIndex((prev) => (prev + 1) % n)}
            ></img>
          </div>
          <div className="close scale" onClick={() => setImageIndex(null)}>
            X
          </div>
        </div>
      )}
      <div className="bigImage">
        <img src={images[0]} alt="" onClick={() => setImageIndex(0)}></img>
      </div>
      <div className="smallImages">
        {images.slice(1).map((image, index) => {
          return (
            <img
              src={image}
              alt=""
              key={index}
              onClick={() => setImageIndex(index + 1)}
            ></img>
          );
        })}
      </div>
    </div>
  );
};

export default Slider;
