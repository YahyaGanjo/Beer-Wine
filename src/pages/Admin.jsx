import React, { useContext, useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import AuthContext from '../store/auth-context';
import '../styles/admin.css';
import Helmet from '../components/Helmet/Helmet';
import { db } from '../initFirebase';
import { ref, onValue, update } from 'firebase/database';

const Admin = () => {
  const navigate = useNavigate();
  const [newReviews, setNewReviews] = useState([]);
  const [newProducts, setNewProducts] = useState([]);
  const [newPrice, setNewPrice] = useState(0);
  const [newTitle, setNewTitle] = useState('');
  const authCtx = useContext(AuthContext);
  const logoutHandler = () => {
    authCtx.logout();
    navigate('/home');
  };
  useEffect(() => {
    onValue(ref(db), (snapshot) => {
      const data = snapshot.val();
      if (!data.reviews) {
        return;
      } else {
        const reviews = Object.entries(data.reviews);
        setNewReviews(reviews);
      }
      if (!data.products) {
        return;
      } else {
        const productsData = Object.entries(data.products);
        setNewProducts(productsData);
      }
    });
  }, []);

  const deleteHandler = (review) => {
    const newPostData = null;
    const deleteData = {};
    deleteData['/reviews/' + review[0]] = newPostData;
    update(ref(db), deleteData);
    setNewReviews(newReviews.filter((item) => item !== review));
  };
  const selectHandler = (review) => {
    const newPostData = {
      name: review[1].name,
      review: review[1].review,
      date: review[1].date,
      selected: true,
      new: false,
    };
    const updates = {};
    updates['/reviews/' + review[0]] = newPostData;
    update(ref(db), updates);
    setNewReviews(newReviews.filter((item) => item !== review));
  };
  const deliveryHandler = (value) => {
    let deliveryState;
    value === 'open' ? (deliveryState = true) : (deliveryState = false);
    update(ref(db), {
      delivery: deliveryState,
    });
  };
  const newPriceHandler = (newPrice, item) => {
    let statieGeld;
    item[1].price1 ? (statieGeld = item[1].price1) : (statieGeld = null);
    const newPostData = {
      category: item[1].category,
      id: item[1].id,
      desc: item[1].desc,
      image01: item[1].image01,
      price1: statieGeld,
      title: item[1].title,
      price: newPrice,
    };
    const updates = {};
    updates['/products/' + item[0]] = newPostData;
    update(ref(db), updates);
  };
  const newTitleHandler = (newTitle, item) => {
    let statieGeld;
    item[1].price1 ? (statieGeld = item[1].price1) : (statieGeld = null);
    const newPostData = {
      category: item[1].category,
      id: item[1].id,
      desc: item[1].desc,
      image01: item[1].image01,
      price1: statieGeld,
      title: newTitle,
      price: item[1].price,
    };
    const updates = {};
    updates['/products/' + item[0]] = newPostData;
    update(ref(db), updates);
  };
  return (
    <Helmet title='Admin'>
      <button className='logout-btn' onClick={logoutHandler}>
        Uitloggen
      </button>
      <section style={{ width: '20%', margin: '0 auto' }}>
        <h5>Bezorging</h5>
        <div class='btn-group' role='group' aria-label='Basic example'>
          <button
            type='button'
            class='btn btn-primary'
            onClick={() => deliveryHandler('open')}
          >
            Open
          </button>
          <button
            type='button'
            class='btn btn-primary'
            onClick={() => deliveryHandler('close')}
          >
            Dicht
          </button>
        </div>
      </section>
      <div className='d-flex flex-row gap-2 justify-content-between'>
        <div>
          {newReviews.map((review) => {
            return (
              <div className='reviews-container'>
                <h6>Beoordeling:</h6>
                <p>{review[1].review}</p>
                <div className=' slider__content d-flex align-items-center gap-5 '>
                  <p>Datum & Naam :</p>
                  <p>{review[1].date}</p>
                  <p>{review[1].name}</p>
                </div>
                <div style={{ display: 'flex', gap: '18px' }}>
                  <button
                    className='bel_ons-btn'
                    onClick={() => selectHandler(review)}
                  >
                    selecteer
                  </button>
                  <button
                    className='bel_ons-btn'
                    onClick={() => deleteHandler(review)}
                  >
                    verwijderen
                  </button>
                </div>
              </div>
            );
          })}
        </div>
        <div className='products-container'>
          {newProducts.map((item) => (
            <div className='product__item'>
              <div className=' d-flex align-items-center justify-content-between '>
                <span className='product__price'>€{item[1].title}</span>
                <span className='product__price'>€{item[1].price}</span>
              </div>
              <div>Nieuwe prijs:</div>
              <input
                type='number'
                onChange={(e) => setNewPrice(e.target.value)}
              />
              <button
                className='bel_ons-btn'
                onClick={() => newPriceHandler(newPrice, item)}
              >
                Bewerken
              </button>
              <div>Nieuwe titel:</div>
              <input
                type='text'
                onChange={(e) => setNewTitle(e.target.value)}
              />
              <button
                className='bel_ons-btn'
                onClick={() => newTitleHandler(newTitle, item)}
              >
                Bewerken
              </button>
            </div>
          ))}
        </div>
      </div>
    </Helmet>
  );
};

export default Admin;
