import React, { useState } from 'react';
import { useSelector } from 'react-redux';
import { Container, Row, Col } from 'reactstrap';
import CommonSection from '../components/UI/common-section/CommonSection';
import Helmet from '../components/Helmet/Helmet';
import Modal from '../components/UI/common-section/Modal';
import { db } from '../initFirebase';
import { ref, onValue } from 'firebase/database';

import '../styles/checkout.css';

const Checkout = () => {
  const [showModal, setShowModal] = useState(false);
  const [enterName, setEnterName] = useState('');
  const [enterEmail, setEnterEmail] = useState('');
  const [enterNumber, setEnterNumber] = useState('');
  const [enterCity, setEnterCity] = useState('');
  const [enterAddress, setEnterAddress] = useState('');
  const [postalCode, setPostalCode] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [showClosed, setShowClosed] = useState(false);
  const [showWrong, setShowWrong] = useState(false);

  const shippingInfo = [];
  const cartTotalAmount = useSelector((state) => state.cart.totalAmount);
  const cartProducts = useSelector((state) => state.cart.cartItems);

  let shippingCost;
  const numbersOnly = postalCode.replace(/[^\d.-]/g, '');
  const postcodes3 = ['6671', '6668', '6666', '6672', '6673', '6674', '6665'];
  const postcodes5 = [
    '6675',
    '4043',
    '6669',
    '4041',
    '4051',
    '4053',
    '6661',
    '6662',
    '6678',
    '6861',
    '6862',
    '6846',
    '6871',
    '6866',
    '6676',
  ];

  if (cartTotalAmount === 0 || cartTotalAmount > 49.99) {
    shippingCost = 0;
  } else {
    if (postcodes3.includes(numbersOnly)) {
      shippingCost = 3;
    } else if (postcodes5.includes(numbersOnly)) {
      shippingCost = 5;
    } else {
      shippingCost = 0;
    }
  }

  const totalAmount = cartTotalAmount + Number(shippingCost);

  const submitHandler = (e) => {
    e.preventDefault();
    setIsLoading(true);
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
      setIsLoading(false);
      return;
    }
    if (
      postcodes3.includes(numbersOnly) === false ||
      postcodes3.includes(numbersOnly) === false
    ) {
      setShowWrong(true);
      setIsLoading(false);
      return;
    }

    shippingInfo.push(userShippingAddress);

    onValue(ref(db), (snapshot) => {
      const deliveryState = snapshot.val().delivery;
      if (!deliveryState) {
        setIsLoading(false);
        setShowClosed(true);
      } else {
        fetch(
          'https://connecting-beer-stripe.herokuapp.com/create-checkout-session',
          {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
            },
            body: JSON.stringify({
              items: cartProducts,
              delivery: shippingCost,
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
            setIsLoading(false);
          });
      }
    });
  };

  return (
    <Helmet title='Checkout'>
      <CommonSection title='Bestelling' />
      {showModal && (
        <Modal>
          <h5>Sorry! Minimaal bestelling €20</h5>
          <button className='bel_ons-btn' onClick={() => setShowModal(false)}>
            Sluiten
          </button>
        </Modal>
      )}
      {showWrong && (
        <Modal>
          <h5>
            Helaas! Bezorgen we niet in jouw regio, maar je kan ons altijd
            bellen om de mogelijkheden te bespreken
          </h5>
          <h4 className='phone'>06-84045272</h4>
          <button className='bel_ons-btn' onClick={() => setShowWrong(false)}>
            Sluiten
          </button>
        </Modal>
      )}
      {showClosed && (
        <Modal>
          <h5>Sorry! Wij zijn nu gesloten.</h5>
          <button className='bel_ons-btn' onClick={() => setShowClosed(false)}>
            Sluiten
          </button>
        </Modal>
      )}
      {isLoading && (
        <Modal>
          <p>Verwerken</p>
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
                  Bestelling:{' '}
                  <span>
                    €{(Math.round(cartTotalAmount * 100) / 100).toFixed(2)}
                  </span>
                </h6>
                <h6 className='d-flex align-items-center justify-content-between mb-3'>
                  Bezorg Kosten:{' '}
                  <span>
                    €{(Math.round(shippingCost * 100) / 100).toFixed(2)}
                  </span>
                </h6>
                <div className='checkout__total'>
                  <h5 className='d-flex align-items-center justify-content-between'>
                    Totaal:{' '}
                    <span>
                      €{(Math.round(totalAmount * 100) / 100).toFixed(2)}
                    </span>
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
