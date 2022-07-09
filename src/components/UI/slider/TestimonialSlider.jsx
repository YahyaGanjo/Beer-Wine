import React from 'react';
import { useState } from 'react';
import { useEffect } from 'react';
import Slider from 'react-slick';
import { db } from '../../../initFirebase';
import { ref, onValue } from 'firebase/database';

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
    onValue(ref(db), (snapshot) => {
      const data = snapshot.val().reviews;
      if (!data) {
        return;
      } else {
        const reviews = Object.entries(data);
        const selectedReviews = reviews.filter((review) => {
          return review[1].selected;
        });
        setRenderReviews(selectedReviews);
      }
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
