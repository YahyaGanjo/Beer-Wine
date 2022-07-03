import React, { useState } from 'react';
import { useSelector } from 'react-redux';
import { Container, Row, Col } from 'reactstrap';
import CommonSection from '../components/UI/common-section/CommonSection';
import Helmet from '../components/Helmet/Helmet';
import Modal from '../components/UI/common-section/Modal';

import '../styles/checkout.css';

const Checkout = () => {
  const [showModal, setShowModal] = useState(false);
  const [enterName, setEnterName] = useState('');
  const [enterEmail, setEnterEmail] = useState('');
  const [enterNumber, setEnterNumber] = useState('');
  const [enterCity, setEnterCity] = useState('');
  const [enterAddress, setEnterAddress] = useState('');
  const [postalCode, setPostalCode] = useState('');

  const shippingInfo = [];
  const cartTotalAmount = useSelector((state) => state.cart.totalAmount);
  const cartProducts = useSelector((state) => state.cart.cartItems);

  let shippingCost;

  if (cartTotalAmount === 0 || cartTotalAmount > 49.99) {
    shippingCost = 0;
  } else {
    shippingCost = 5;
  }

  const totalAmount = cartTotalAmount + Number(shippingCost);

  const submitHandler = (e) => {
    e.preventDefault();
    const userShippingAddress = {
      name: enterName,
      email: enterEmail,
      phone: enterNumber,
      city: enterCity,
      address: enterAddress,
      postalCode: postalCode,
    };
    if (cartTotalAmount < 20) {
      setShowModal(true);
      return;
    }

    shippingInfo.push(userShippingAddress);
    fetch(
      'https://connecting-beer-stripe.herokuapp.com/create-checkout-session',
      {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          items: cartProducts,
        }),
      }
    )
      .then((res) => {
        if (res.ok) return res.json();
        return res.json().then((json) => Promise.reject(json));
      })
      .then(({ url }) => {
        window.location = url;
      })
      .catch((e) => {
        console.error(e.error);
      });
  };

  return (
    <Helmet title='Checkout'>
      <CommonSection title='Bestelling' />
      {showModal && (
        <Modal>
          <h5>Sorry! Minimaal bestelling €20</h5>
          <button onClick={() => setShowModal(false)}>Sluiten</button>
        </Modal>
      )}

      <section>
        <Container>
          <Row>
            <Col lg='8' md='6'>
              <h6 className='mb-4'>Bestelgegevens</h6>
              <form className='checkout__form' onSubmit={submitHandler}>
                <div className='form__group'>
                  <input
                    type='text'
                    placeholder='Volledige Naam'
                    required
                    onChange={(e) => setEnterName(e.target.value)}
                  />
                </div>

                <div className='form__group'>
                  <input
                    type='email'
                    placeholder='Email'
                    required
                    onChange={(e) => setEnterEmail(e.target.value)}
                  />
                </div>
                <div className='form__group'>
                  <input
                    type='number'
                    placeholder='Telefoon Nummer'
                    required
                    onChange={(e) => setEnterNumber(e.target.value)}
                  />
                </div>
                <div className='form__group'>
                  <input
                    type='text'
                    placeholder='Straat en huisnummer'
                    required
                    onChange={(e) => setEnterAddress(e.target.value)}
                  />
                </div>
                <div className='form__group'>
                  <input
                    type='text'
                    placeholder='Plaats'
                    required
                    onChange={(e) => setEnterCity(e.target.value)}
                  />
                </div>
                <div className='form__group'>
                  <input
                    type='text'
                    placeholder='Postcode'
                    required
                    onChange={(e) => setPostalCode(e.target.value)}
                  />
                </div>
                <button type='submit' className='addTOCart__btn'>
                  Bestel
                </button>
              </form>
            </Col>

            <Col lg='4' md='6'>
              <div className='checkout__bill'>
                <h6 className='d-flex align-items-center justify-content-between mb-3'>
                  Bestelling: <span>€{cartTotalAmount}</span>
                </h6>
                <h6 className='d-flex align-items-center justify-content-between mb-3'>
                  Bezorg Kosten: <span>€{shippingCost}</span>
                </h6>
                <div className='checkout__total'>
                  <h5 className='d-flex align-items-center justify-content-between'>
                    Totaal: <span>€{totalAmount}</span>
                  </h5>
                </div>
              </div>
            </Col>
          </Row>
        </Container>
      </section>
    </Helmet>
  );
};

export default Checkout;
