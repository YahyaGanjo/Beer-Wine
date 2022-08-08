import React, { useState } from 'react';
import { useSelector } from 'react-redux';
import { Container, Row, Col } from 'reactstrap';
import {
  Dropdown,
  DropdownToggle,
  DropdownMenu,
  DropdownItem,
} from 'reactstrap';
import { BsFillTelephoneFill } from 'react-icons/bs';
import CommonSection from '../components/UI/common-section/CommonSection';
import Helmet from '../components/Helmet/Helmet';
import Modal from '../components/UI/common-section/Modal';
import { db } from '../initFirebase';
import { ref, onValue } from 'firebase/database';

import '../styles/checkout.css';

const Checkout = () => {
  const [showModal, setShowModal] = useState(false);
  const [showWrong, setShowWrong] = useState(false);
  const [deliveryCost, setDeliveryCost] = useState(0.0);
  const [isLoading, setIsLoading] = useState(false);
  const [place, setPlace] = useState('Plaats');
  const [showClosed, setShowClosed] = useState(false);

  const [dropdownOpen, setDropdownOpen] = useState(false);

  const toggle = () => setDropdownOpen((prevState) => !prevState);

  const cartTotalAmount = useSelector((state) => state.cart.totalAmount);
  const cartProducts = useSelector((state) => state.cart.cartItems);

  const totalAmount = cartTotalAmount + deliveryCost;

  const submitHandler = (e) => {
    e.preventDefault();
    setIsLoading(true);
    if (cartTotalAmount < 40) {
      setShowModal(true);
      setIsLoading(false);
      return;
    }
    if (place === 'Plaats') {
      setShowWrong(true);
      setIsLoading(false);
      return;
    }

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
              delivery: deliveryCost,
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
          <h5>Sorry! Minimaal bestelling €40</h5>
          <button className='bel_ons-btn' onClick={() => setShowModal(false)}>
            Sluiten
          </button>
        </Modal>
      )}
      {showWrong && (
        <Modal>
          <h5>Selecteer a.u.b. een afleverplaats</h5>
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
            <Col lg='4' md='6'>
              <div className='checkout__bill'>
                <h6 className='d-flex align-items-center justify-content-between mb-3'>
                  Bestelling:{' '}
                  <span>
                    €{(Math.round(cartTotalAmount * 100) / 100).toFixed(2)}
                  </span>
                </h6>
                <h6 className='d-flex align-items-center justify-content-between mb-3'>
                  Bezorg Kosten: <span>€{deliveryCost.toFixed(2)}</span>
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
            <Col lg='8' md='6'>
              <h6 className='mb-4'>bezorgplaats</h6>
              <p>
                Graag uw regio kiezen. Als we in uw regio niet bezorgen, kunt u
                ons altijd bellen om de mogelijkheden te bespreken<br></br>
                <a href='tel:+31684045272'>
                  <BsFillTelephoneFill />
                  {'    Bel ons'}
                </a>
                <h6>0684045272</h6>
              </p>
              <div className='d-flex p-1'>
                <Dropdown
                  isOpen={dropdownOpen}
                  toggle={toggle}
                  style={{ marginBottom: '600px' }}
                >
                  <button
                    className='bel_ons-btn'
                    onClick={submitHandler}
                    style={{ margin: '10px', width: '100px' }}
                  >
                    Bestel
                  </button>
                  <DropdownToggle caret>{place}</DropdownToggle>
                  <DropdownMenu>
                    <DropdownItem
                      onClick={() => {
                        cartTotalAmount >= 70
                          ? setDeliveryCost(0.0)
                          : setDeliveryCost(5.0);
                        setPlace('Arnhem');
                      }}
                    >
                      Arnhem
                    </DropdownItem>
                    <DropdownItem
                      onClick={() => {
                        cartTotalAmount >= 70
                          ? setDeliveryCost(0.0)
                          : setDeliveryCost(5.0);
                        setPlace('Nijmegen');
                      }}
                    >
                      Nijmegen
                    </DropdownItem>
                    <DropdownItem
                      onClick={() => {
                        cartTotalAmount >= 70
                          ? setDeliveryCost(0.0)
                          : setDeliveryCost(5.0);
                        setPlace('Wageningen');
                      }}
                    >
                      Wageningen
                    </DropdownItem>
                    <DropdownItem
                      onClick={() => {
                        cartTotalAmount >= 70
                          ? setDeliveryCost(0.0)
                          : setDeliveryCost(5.0);
                        setPlace('Elst');
                      }}
                    >
                      Elst
                    </DropdownItem>
                    <DropdownItem
                      onClick={() => {
                        cartTotalAmount >= 70
                          ? setDeliveryCost(0.0)
                          : setDeliveryCost(3.0);
                        setPlace('Zetten');
                      }}
                    >
                      Zetten
                    </DropdownItem>
                    <DropdownItem
                      onClick={() => {
                        cartTotalAmount >= 70
                          ? setDeliveryCost(0.0)
                          : setDeliveryCost(3.0);
                        setPlace('Driel');
                      }}
                    >
                      Driel
                    </DropdownItem>
                    <DropdownItem
                      onClick={() => {
                        cartTotalAmount >= 70
                          ? setDeliveryCost(0.0)
                          : setDeliveryCost(3.0);
                        setPlace('Randwijk');
                      }}
                    >
                      Randwijk
                    </DropdownItem>
                    <DropdownItem
                      onClick={() => {
                        cartTotalAmount >= 70
                          ? setDeliveryCost(0.0)
                          : setDeliveryCost(3.0);
                        setPlace('Hemmen');
                      }}
                    >
                      Hemmen
                    </DropdownItem>
                    <DropdownItem
                      onClick={() => {
                        cartTotalAmount >= 70
                          ? setDeliveryCost(0.0)
                          : setDeliveryCost(3.0);
                        setPlace('Andelst');
                      }}
                    >
                      Andelst
                    </DropdownItem>
                    <DropdownItem
                      onClick={() => {
                        cartTotalAmount >= 70
                          ? setDeliveryCost(0.0)
                          : setDeliveryCost(3.0);
                        setPlace('Herveld');
                      }}
                    >
                      Herveld
                    </DropdownItem>
                    <DropdownItem
                      onClick={() => {
                        cartTotalAmount >= 70
                          ? setDeliveryCost(0.0)
                          : setDeliveryCost(5.0);
                        setPlace('Valburg');
                      }}
                    >
                      Valburg
                    </DropdownItem>
                    <DropdownItem
                      onClick={() => {
                        cartTotalAmount >= 70
                          ? setDeliveryCost(0.0)
                          : setDeliveryCost(5.0);
                        setPlace('Opheusden');
                      }}
                    >
                      Opheusden
                    </DropdownItem>
                    <DropdownItem
                      onClick={() => {
                        setDeliveryCost(5.0);
                        setPlace('Dodewaard');
                      }}
                    >
                      Dodewaard
                    </DropdownItem>
                    <DropdownItem
                      onClick={() => {
                        cartTotalAmount >= 70
                          ? setDeliveryCost(0.0)
                          : setDeliveryCost(5.0);
                        setPlace('Kesteren');
                      }}
                    >
                      Kesteren
                    </DropdownItem>
                    <DropdownItem
                      onClick={() => {
                        cartTotalAmount >= 70
                          ? setDeliveryCost(0.0)
                          : setDeliveryCost(5.0);
                        setPlace('Ochten');
                      }}
                    >
                      Ochten
                    </DropdownItem>
                    <DropdownItem
                      onClick={() => {
                        cartTotalAmount >= 70
                          ? setDeliveryCost(0.0)
                          : setDeliveryCost(5.0);
                        setPlace('Ijzendoorn');
                      }}
                    >
                      Ijzendoorn
                    </DropdownItem>
                    <DropdownItem
                      onClick={() => {
                        cartTotalAmount >= 70
                          ? setDeliveryCost(0.0)
                          : setDeliveryCost(3.0);
                        setPlace('Heteren');
                      }}
                    >
                      Heteren
                    </DropdownItem>
                    <DropdownItem
                      onClick={() => {
                        cartTotalAmount >= 70
                          ? setDeliveryCost(0.0)
                          : setDeliveryCost(5.0);
                        setPlace('Oosterhout');
                      }}
                    >
                      Oosterhout
                    </DropdownItem>
                    <DropdownItem
                      onClick={() => {
                        cartTotalAmount >= 70
                          ? setDeliveryCost(0.0)
                          : setDeliveryCost(5.0);
                        setPlace('Oosterbeek');
                      }}
                    >
                      Oosterbeek
                    </DropdownItem>
                    <DropdownItem
                      onClick={() => {
                        cartTotalAmount >= 70
                          ? setDeliveryCost(0.0)
                          : setDeliveryCost(5.0);
                        setPlace('Schuytgraaf');
                      }}
                    >
                      Schuytgraaf
                    </DropdownItem>
                    <DropdownItem
                      onClick={() => {
                        cartTotalAmount >= 70
                          ? setDeliveryCost(0.0)
                          : setDeliveryCost(5.0);
                        setPlace('Renkum');
                      }}
                    >
                      Renkum
                    </DropdownItem>
                    <DropdownItem
                      onClick={() => {
                        cartTotalAmount >= 70
                          ? setDeliveryCost(0.0)
                          : setDeliveryCost(5.0);
                        setPlace('Heelsum');
                      }}
                    >
                      Heelsum
                    </DropdownItem>
                    <DropdownItem
                      onClick={() => {
                        cartTotalAmount >= 70
                          ? setDeliveryCost(0.0)
                          : setDeliveryCost(5.0);
                        setPlace('Hoemoet');
                      }}
                    >
                      Hoemoet
                    </DropdownItem>
                  </DropdownMenu>
                </Dropdown>
              </div>
            </Col>
          </Row>
        </Container>
      </section>
    </Helmet>
  );
};

export default Checkout;
