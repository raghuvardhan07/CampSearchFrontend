import React, { useEffect, useState } from 'react';
import {useNavigate} from "react-router-dom"
import axios from 'axios';
import Slider from 'react-slick';
import './App.css';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';

const ImageCarousel = () => {
  const [images, setImages] = useState([]);
  const [slideIndex, setSlideIndex] = useState(0);
  const navigate = useNavigate()

  useEffect(() => {
    axios.get('http://localhost:5000/api/getAllImages')
      .then(response => {
        console.log(response.data);
        setImages(response.data);
      })
      .catch(error => {
        console.error('Error fetching images:', error);
      });
  }, []);
  const handleImageClick = (e) => {
    navigate(`/campsite/${images[slideIndex]._id}`)
  }
  const settings = {
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1, 
    autoplay: true, // Auto play the carousel
    autoplaySpeed: 3000, // Set the autoplay speed to 2 seconds
    fade: true, // Enable fade transition
    cssEase: 'linear', // Set the easing function for the fade, 
    accessibilty: true, 
    beforeChange: (current, next) => setSlideIndex(next)
  };

  return (
    <div className='carousel'>
      <Slider {...settings}>
        {images.map((image) => (
          <div key={image._id}>
            <img src={`http://localhost:5000/images/${image.imagePath}`} name={image._id} alt={image.description} onClick={handleImageClick}/>
            <h3 className="Location">{image.location}<br />{image.description}</h3>
          </div>
        ))}
      </Slider>
    </div>
  );
};

export default ImageCarousel;
