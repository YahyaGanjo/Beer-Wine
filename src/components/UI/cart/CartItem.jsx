import React from 'react';
import { ListGroupItem } from 'reactstrap';

import '../../../styles/cart-item.css';

import { useDispatch } from 'react-redux';
import { cartActions } from '../../../store/shopping-cart/cartSlice';

const CartItem = ({ item }) => {
  const { id, title, price, price1, image01, quantity } = item;

  const dispatch = useDispatch();

  const incrementItem = () => {
    dispatch(
      cartActions.addItem({
        id,
        title,
        price,
        price1,
        image01,
      })
    );
  };

  const decreaseItem = () => {
    dispatch(cartActions.removeItem(id));
  };

  const deleteItem = () => {
    dispatch(cartActions.deleteItem(id));
  };

  return (
    <ListGroupItem className='border-0 cart__item'>
      <div className='cart__item-info d-flex gap-3'>
        <img src={image01} alt='product-img' />

        <div className='cart__product-info w-100 d-flex align-items-center gap-2 justify-content-between'>
          <div>
            <h6 className='cart__product-title'>{title}</h6>
            {price1 ? (
              <p className=' d-flex align-items-center gap-2 cart__product-price'>
                {quantity}x{' '}
                <span>
                  €{price} + {(Math.round(price1 * 100) / 100).toFixed(2)}
                </span>
                statie geld
              </p>
            ) : (
              <p className=' d-flex align-items-center gap-2 cart__product-price'>
                {quantity}x <span>€{price}</span>
              </p>
            )}
          </div>

          <span className='delete__btn' onClick={deleteItem}>
            <i class='ri-close-line'></i>
          </span>
        </div>
      </div>
      <div className=' d-flex align-items-center justify-content-evenly increase__decrease-btn'>
        <span className='increase__btn' onClick={incrementItem}>
          <i class='ri-add-line'></i>
        </span>
        <span className='quantity'>{quantity}</span>
        <span className='decrease__btn' onClick={decreaseItem}>
          <i class='ri-subtract-line'></i>
        </span>
      </div>
    </ListGroupItem>
  );
};

export default CartItem;
