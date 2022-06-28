import React, { useState, useEffect } from 'react';

import products from '../assets/fake-data/products';
import { useParams } from 'react-router-dom';
import Helmet from '../components/Helmet/Helmet';
import CartNew from '../components/UI/cart/CartNew';
import CommonSection from '../components/UI/common-section/CommonSection';
import { Container, Row, Col } from 'reactstrap';

import { useDispatch } from 'react-redux';
import { cartActions } from '../store/shopping-cart/cartSlice';
import useWindowDimensions from '../components/Hooks/useWindowDimensions';

import '../styles/product-details.css';

import ProductCard from '../components/UI/product-card/ProductCard';

const FoodDetails = () => {
  const [showCart, setShowCart] = useState(false);
  const { width } = useWindowDimensions();

  useEffect(() => {
    width > 990 ? setShowCart(true) : setShowCart(false);
  }, [width]);
  const { id } = useParams();
  const dispatch = useDispatch();

  const product = products.find((product) => product.id === id);
  const [previewImg, setPreviewImg] = useState(product.image01);
  const { title, price, category, desc, image01 } = product;

  const relatedProduct = products.filter((item) => category === item.category);

  const addItem = () => {
    dispatch(
      cartActions.addItem({
        id,
        title,
        price,
        image01,
      })
    );
  };

  useEffect(() => {
    setPreviewImg(product.image01);
  }, [product]);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [product]);

  return (
    <Helmet title='Product-details'>
      <CommonSection title={title} />

      <section>
        <Container>
          <Row>
            <Col lg='4' md='4'>
              <div className='product__main-img'>
                <img src={previewImg} alt='' className='w-50' />
              </div>
            </Col>

            <Col lg='6' md='6'>
              <div className='single__product-content'>
                <h2 className='product__title mb-3'>{title}</h2>
                <p className='product__price'>
                  {' '}
                  Prijs: <span>€{price}</span>
                </p>
                <p className='category mb-5'>
                  Categorie: <span>{category}</span>
                </p>

                <button onClick={addItem} className='addTOCart__btn'>
                  Voeg toe aan winkelwagen
                </button>
              </div>
            </Col>

            <Col lg='12'>
              <div className='tabs d-flex align-items-center gap-5 py-3'>
                <h6 className='tab__active'>Beschrijving</h6>
              </div>
              <div className='tab__content'>
                <p>{desc}</p>
              </div>
            </Col>

            <Col lg='12' className='mb-5 mt-4'>
              <h2 className='related__Product-title'>
                Misschien vind je dit ook leuk
              </h2>
            </Col>

            {relatedProduct.map((item) => (
              <Col lg='3' md='4' sm='6' xs='6' className='mb-4' key={item.id}>
                <ProductCard item={item} />
              </Col>
            ))}
          </Row>
        </Container>
      </section>
      <section>{showCart && <CartNew />}</section>
    </Helmet>
  );
};

export default FoodDetails;
