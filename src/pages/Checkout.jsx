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
  const [showClosed, setShowClosed] = useState(false);

  const [dropdownOpen, setDropdownOpen] = useState(false);

  const toggle = () => setDropdownOpen((prevState) => !prevState);

  const cartTotalAmount = useSelector((state) => state.cart.totalAmount);
  const cartProducts = useSelector((state) => state.cart.cartItems);

  const totalAmount = cartTotalAmount + deliveryCost;

  const submitHandler = (e) => {
    e.preventDefault();
    setIsLoading(true);
    if (cartTotalAmount < 20) {
      setShowModal(true);
      setIsLoading(false);
      return;
    }
    if (deliveryCost === 0.0) {
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
          <h5>Sorry! Minimaal bestelling €20</h5>
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
              <div className='d-flex p-5'>
                <Dropdown
                  isOpen={dropdownOpen}
                  toggle={toggle}
                  style={{ marginBottom: '600px' }}
                >
                  <button
                    className='bel_ons-btn'
                    onClick={submitHandler}
                    style={{ margin: '20px', width: '100px' }}
                  >
                    Bestel
                  </button>
                  <DropdownToggle caret>Plaats</DropdownToggle>
                  <DropdownMenu>
                    <DropdownItem onClick={() => setDeliveryCost(3.0)}>
                      Heteren
                    </DropdownItem>
                    <DropdownItem onClick={() => setDeliveryCost(3.0)}>
                      Zetten
                    </DropdownItem>
                    <DropdownItem onClick={() => setDeliveryCost(3.0)}>
                      Driel
                    </DropdownItem>
                    <DropdownItem onClick={() => setDeliveryCost(3.0)}>
                      Randwijk
                    </DropdownItem>
                    <DropdownItem onClick={() => setDeliveryCost(3.0)}>
                      Hemmen
                    </DropdownItem>
                    <DropdownItem onClick={() => setDeliveryCost(3.0)}>
                      Andelst
                    </DropdownItem>
                    <DropdownItem onClick={() => setDeliveryCost(3.0)}>
                      Herveld
                    </DropdownItem>
                    <DropdownItem onClick={() => setDeliveryCost(5.0)}>
                      Valburg
                    </DropdownItem>
                    <DropdownItem onClick={() => setDeliveryCost(5.0)}>
                      Opheusden
                    </DropdownItem>
                    <DropdownItem onClick={() => setDeliveryCost(5.0)}>
                      Dodewaard
                    </DropdownItem>
                    <DropdownItem onClick={() => setDeliveryCost(5.0)}>
                      Kesteren
                    </DropdownItem>
                    <DropdownItem onClick={() => setDeliveryCost(5.0)}>
                      Ochten
                    </DropdownItem>
                    <DropdownItem onClick={() => setDeliveryCost(5.0)}>
                      Ijzendoorn
                    </DropdownItem>
                    <DropdownItem onClick={() => setDeliveryCost(5.0)}>
                      Elst
                    </DropdownItem>
                    <DropdownItem onClick={() => setDeliveryCost(5.0)}>
                      Oosterhout
                    </DropdownItem>
                    <DropdownItem onClick={() => setDeliveryCost(5.0)}>
                      Oosterbeek
                    </DropdownItem>
                    <DropdownItem onClick={() => setDeliveryCost(5.0)}>
                      Schuytgraag
                    </DropdownItem>
                    <DropdownItem onClick={() => setDeliveryCost(5.0)}>
                      Renkum
                    </DropdownItem>
                    <DropdownItem onClick={() => setDeliveryCost(5.0)}>
                      Heelsum
                    </DropdownItem>
                    <DropdownItem onClick={() => setDeliveryCost(5.0)}>
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
