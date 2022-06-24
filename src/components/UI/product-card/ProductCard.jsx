import React from 'react';

import '../../../styles/product-card.css';

import { HashLink as Link } from 'react-router-hash-link';

import { useDispatch } from 'react-redux';
import { cartActions } from '../../../store/shopping-cart/cartSlice';

const ProductCard = (props) => {
  const { id, title, image01, price } = props.item;
  const dispatch = useDispatch();

  const addToCart = () => {
    dispatch(
      cartActions.addItem({
        id,
        title,
        image01,
        price,
      })
    );
  };

  return (
    <div className='product__item'>
      <div className='product__content'>
        <Link to={`/producten/${id}`}>
          <img src={image01} alt='product-img' className='w-50' />
          <h5>{title}</h5>
        </Link>
      </div>

      <div className=' d-flex align-items-center justify-content-between '>
        <span className='product__price'>€{price}</span>
        <button className='addTOCart__btn' onClick={addToCart}>
          In Winkelwagen
        </button>
      </div>
    </div>
  );
};

export default ProductCard;
