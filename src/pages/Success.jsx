import React from 'react';
import { useEffect } from 'react';
import Helmet from '../components/Helmet/Helmet';
import '../styles/success.css';

const Success = () => {
  useEffect(() => {
    fetch('https://connecting-beer-stripe.herokuapp.com/success', {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      },
    })
      .then((res) => {
        if (res.ok) return res.json();
      })
      .then((res) => {
        console.log(res);
      })
      .catch((e) => {
        console.error(e.error);
      });
  }, []);
  return (
    <Helmet>
      <h3 className='success-title'>
        Bedankt voo uw <span>Bestelling</span>
      </h3>
      <p className='success-msg'>
        Fijn dat je koos voor Bierwijn Bezorging. We gaan direct aan de slaag.
        Je krijgt binnenkort een mailtje met je Bestelgegevens en bezorg moment.
      </p>
    </Helmet>
  );
};

export default Success;
