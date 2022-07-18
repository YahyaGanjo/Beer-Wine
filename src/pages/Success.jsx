/* eslint-disable react-hooks/exhaustive-deps */
import React from 'react';
import { useState } from 'react';
import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import Helmet from '../components/Helmet/Helmet';
import '../styles/success.css';
import { Container, Col, ListGroup, ListGroupItem } from 'reactstrap';
import { db } from '../initFirebase';
import { onValue, ref, update } from 'firebase/database';

const Success = () => {
  const [name, setName] = useState('');
  const [phone, setPhone] = useState('');
  const [name1, setName1] = useState('');
  const [totalAmount, setTotalAmount] = useState(0);
  const [shipping, setShipping] = useState({});
  const [shippingCost, setShippingCost] = useState(0);
  const [orderedItems, setOrderedItems] = useState([]);
  const search = useLocation().search;
  const id = new URLSearchParams(search).get('session_id');

  useEffect(() => {
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
        setTotalAmount(res.amount_total / 100);
        setName(res.customer_details.name);
        setPhone(res.customer_details.phone);
        setName1(res.shipping.name);
        setShipping(res.shipping.address);
        setShippingCost(res.shipping_options[0].shipping_amount / 100);
      })
      .catch((e) => {
        console.error(e.error);
      });

    fetch('https://connecting-beer-stripe.herokuapp.com/order-items', {
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
        setOrderedItems(res.data);
        console.log('api fetched');
        if (res.data) {
          onValue(ref(db), (snapshot) => {
            const data = Object.keys(snapshot.val().orders);
            if (data.includes(id)) {
              console.log('found / no sms');
            } else {
              console.log('send sms');
              const updates = {};
              updates['/orders/' + id] = '';
              update(ref(db), updates);
              fetch('https://connecting-beer-stripe.herokuapp.com/send-sms', {
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
                .catch((e) => {
                  console.error(e.error);
                });
            }
          });
        }
      })
      .catch((e) => {
        console.error(e.error);
      });
  }, []);

  return (
    <Helmet>
      <h3 className='success-title'>
        Hoi <span>{name}</span>! Bedankt voor je Bestelling
      </h3>
      <p className='success-msg'>
        Fijn dat je koos voor BierWijn Taxi. We gaan direct aan de slaag. Je
        krijgt binnenkort een mailtje met je Bestelgegevens en bezorg moment.
      </p>
      {
        <Container>
          <Col
            lg='3'
            md='4'
            sm='6'
            style={{ margin: '10px' }}
            className='delivery__time-item'
          >
            <h5 className='footer__title'>Contactsgegevens</h5>
            <ListGroup className='deliver__time-list'>
              <ListGroupItem className=' delivery__time-item border-0 ps-0'>
                <span>Naam:</span>
                <span className='days'>{name1}</span>
                <br />
                <span>Telefoon:</span>
                <span className='days'>{phone}</span>
                <br />
                <span>Adres:</span>
                <span className='days'>{shipping.line1}</span>
                <br />
                <span>Postcode:</span>
                <span className='days'>{shipping.postal_code}</span>
                <br />
                <span>Plaats:</span>
                <span className='days'>{shipping.city}</span>
                <br />
              </ListGroupItem>
            </ListGroup>
          </Col>
          <Col
            lg='3'
            md='4'
            sm='8'
            style={{ margin: '10px' }}
            className='delivery__time-item'
          >
            <h5 className='footer__title'>Bestelgegevens</h5>
            <ListGroup className='deliver__time-list'>
              <ListGroupItem className=' delivery__time-item border-0 ps-0'>
                {orderedItems.map((item) => (
                  <>
                    <span>{item.description}</span>
                    <span className='days'>
                      {item.quantity} x {item.price.unit_amount / 100}
                    </span>
                    <br />
                  </>
                ))}
                <span>Bezorgkosten:</span>
                <span className='days'>{shippingCost}</span>
                <br />
                <span>Totaal:</span>
                <span className='days'>{totalAmount}</span>
                <br />
              </ListGroupItem>
            </ListGroup>
          </Col>
        </Container>
      }
    </Helmet>
  );
};

export default Success;
