import React from "react";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css"; // Import slick carousel CSS
import "slick-carousel/slick/slick-theme.css"; // Optional: Import slick theme CSS

const Carousel = ({ images }) => {
  const settings = {
    dots: true,  
    fade: true,
    infinite: true,
    speed: 500,
    autoplay: true,
    autoplaySpeed: 3000,
    slidesToShow: 1,
    slidesToScroll: 1,
    waitForAnimate: true,
    pauseOnHover: true,
  };

  return (
    <div className="carousel-container" style={{ height: "500px" }}>
      <Slider {...settings}>
        {images
          .filter((image) => image?.status === true)
          .map((image, index) => (
            <div key={index} className="carousel-slide">
              <img
                src={image?.banner_images?.path}
                alt={image?.alt || "Carousel Image"}
                className="w-full h-full object-contain"
              />
            </div>
          ))}
      </Slider>
    </div>
  );
};

export default Carousel;