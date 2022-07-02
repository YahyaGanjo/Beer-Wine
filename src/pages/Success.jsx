import React from 'react';
import Helmet from '../components/Helmet/Helmet';
import '../styles/success.css';

const Success = () => {
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
