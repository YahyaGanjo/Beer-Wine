import React from 'react';
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
  return (
    <Slider {...settings}>
      <div>
        <p className='review__text'>"Super service! op tijd en heerlijk"</p>
        <div className=' slider__content d-flex align-items-center gap-3 '>
          <h6>Lieke</h6>
        </div>
      </div>
      <div>
        <p className='review__text'>"Koude beer, snel bezorgd!"</p>
        <div className='slider__content d-flex align-items-center gap-3 '>
          <h6>Tevreden Klant</h6>
        </div>
      </div>
      <div>
        <p className='review__text'>
          "Was zeer snel bezorgd, hele vriendelijke bezorger, topper."
        </p>
        <div className='slider__content d-flex align-items-center gap-3 '>
          <h6>Luuk snijder</h6>
        </div>
      </div>
    </Slider>
  );
};

export default TestimonialSlider;
