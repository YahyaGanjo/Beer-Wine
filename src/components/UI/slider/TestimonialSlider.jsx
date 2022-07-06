import React from 'react';
import { useState } from 'react';
import { useEffect } from 'react';
import Slider from 'react-slick';

import '../../../styles/slider.css';

const TestimonialSlider = () => {
  const settings = {
    dots: true,
    autoplay: true,
    infinite: true,
    speed: 1000,
    autoplaySpeed: 4000,
    swipeToSlide: true,
    slidesToShow: 1,
    slidesToScroll: 1,
  };
  const [renderReviews, setRenderReviews] = useState([]);

  useEffect(() => {
    fetch(
      'https://one-project-36fc7-default-rtdb.europe-west1.firebasedatabase.app/reviews.json',
      {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
        },
      }
    )
      .then((res) => {
        if (res.ok) {
          return res.json();
        } else {
          return res.json().then((data) => {
            let errorMessage = 'Iets misgegaan!';
            if (data && data.error && data.error.message) {
              errorMessage = data.error.message;
            }

            throw new Error(errorMessage);
          });
        }
      })
      .then((data) => {
        const reviews = Object.entries(data);
        const selectedReviews = reviews.filter((review) => {
          return review[1].selected;
        });
        setRenderReviews(selectedReviews);
      })
      .catch((err) => {
        alert(err.message);
      });
  }, []);
  return (
    <Slider {...settings}>
      {renderReviews.map((review) => {
        return (
          <div>
            <p className='review__text'>{review[1].review}</p>
            <div className=' slider__content d-flex align-items-center gap-3 '>
              <h6>{review[1].date}</h6>
              <h6>{review[1].name}</h6>
            </div>
          </div>
        );
      })}
    </Slider>
  );
};

export default TestimonialSlider;
