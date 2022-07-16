import React from 'react';
import Helmet from '../components/Helmet/Helmet';
import '../styles/success.css';

const Success = () => {
  const handleDetails = (event) => {
    event.preventDefault();
    fetch('https://connecting-beer-stripe.herokuapp.com/success', {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      },
    })
      .then((res) => {
        if (res.ok) return res.json();
        return res.json().then((json) => Promise.reject(json));
      })
      .then((res) => {
        console.log(res);
      })
      .catch((e) => {
        console.error(e.error);
      });
  };
  return (
    <Helmet>
      <h3 className='success-title'>
        Bedankt voor uw <span>Bestelling</span>
      </h3>
      <p className='success-msg'>
        Fijn dat je koos voor Bierwijn Bezorging. We gaan direct aan de slaag.
        Je krijgt binnenkort een mailtje met je Bestelgegevens en bezorg moment.
      </p>
      <button onClick={handleDetails}>show details</button>
    </Helmet>
  );
};

export default Success;
