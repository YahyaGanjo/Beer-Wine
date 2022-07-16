import React from 'react';
import { useLocation } from 'react-router-dom';
import Helmet from '../components/Helmet/Helmet';
import '../styles/success.css';

const Success = () => {
  //success?session_id=cs_test_a1qG5M7pLAZqJ7tPF9AfIJte3I0VSujOZhqPsOxFi2eoQMyhtEMZHYlNhD
  const search = useLocation().search;
  const id = new URLSearchParams(search).get('session_id');
  const handleDetails = (event) => {
    console.log(id);
    event.preventDefault();
    fetch('https://connecting-beer-stripe.herokuapp.com/success', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        id,
      }),
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
