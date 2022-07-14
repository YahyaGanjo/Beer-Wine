import React, { useState, useEffect } from 'react';

import { useParams } from 'react-router-dom';
import Helmet from '../components/Helmet/Helmet';
import CartNew from '../components/UI/cart/CartNew';
import CommonSection from '../components/UI/common-section/CommonSection';
import { Container, Row, Col } from 'reactstrap';
import { db } from '../initFirebase';
import { onValue, ref } from 'firebase/database';

import { useDispatch } from 'react-redux';
import { cartActions } from '../store/shopping-cart/cartSlice';
import useWindowDimensions from '../components/Hooks/useWindowDimensions';
import products from '../assets/fake-data/products';

import '../styles/product-details.css';

import ProductCard from '../components/UI/product-card/ProductCard';

const FoodDetails = () => {
  const [showCart, setShowCart] = useState(false);
  const { width } = useWindowDimensions();
  const [product, setProduct] = useState({});
  const [previewImg, setPreviewImg] = useState('');
  const [relatedProducts, setRelatedProducts] = useState([]);

  useEffect(() => {
    width > 990 ? setShowCart(true) : setShowCart(false);
  }, [width]);
  const { id } = useParams();
  const dispatch = useDispatch();

  useEffect(() => {
    onValue(ref(db), (snapshot) => {
      const data = snapshot.val().products;
      Object.values(data).forEach((obj) => {
        obj.price = parseFloat(obj.price);
      });
      const products = Object.values(data);
      const selectedProduct = products.find((product) => product.id === id);
      setPreviewImg(selectedProduct.image01);
      setProduct(selectedProduct);
      const relatedProduct = products.filter(
        (item) => product.category === item.category
      );
      setRelatedProducts(relatedProduct);
    });
  }, [id, product.category, product.image01]);

  const addItem = () => {
    dispatch(
      cartActions.addItem({
        id: product.id,
        title: product.title,
        price: product.price,
        price1: product.price1,
        image01: product.image01,
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
      <CommonSection title={product.title} />

      <section>
        <Container>
          <Row>
            <Col lg='3' md='3'>
              <div className='product__main-img'>
                <img src={previewImg} alt='' className='w-50' />
              </div>
            </Col>

            <Col lg='6' md='6'>
              <div className='single__product-content'>
                <h2 className='product__title mb-3'>{product.title}</h2>
                {product.price1 ? (
                  <p className='product__price'>
                    {' '}
                    Prijs:{' '}
                    <span>
                      €{product.price} +{' '}
                      {(Math.round(product.price1 * 100) / 100).toFixed(2)}
                    </span>
                    statie geld
                  </p>
                ) : (
                  <p className='product__price'>
                    {' '}
                    Prijs: <span>€{product.price}</span>
                  </p>
                )}
                <p className='category mb-5'>
                  Categorie: <span>{product.category}</span>
                </p>

                <button onClick={addItem} className='addTOCart__btn'>
                  Voeg toe aan winkelwagen
                </button>
              </div>
            </Col>

            <Col lg='9'>
              <div className='tabs d-flex align-items-center gap-5 py-3'>
                <h6 className='tab__active'>Beschrijving</h6>
              </div>
              <div className='tab__content'>
                <p>{product.desc}</p>
              </div>
            </Col>

            <Col lg='12' className='mb-5 mt-4'>
              <h2 className='related__Product-title'>
                Misschien vind je dit ook leuk
              </h2>
            </Col>

            {relatedProducts.map((item) => (
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
