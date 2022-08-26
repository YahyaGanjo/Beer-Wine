import React from 'react';

import { ListGroup } from 'reactstrap';
import { HashLink as Link } from 'react-router-hash-link';
import CartItem from './CartItem';

import { useDispatch, useSelector } from 'react-redux';
import { cartUiActions } from '../../../store/shopping-cart/cartUiSlice';

import '../../../styles/shopping-cart.css';

const Carts = () => {
  const dispatch = useDispatch();
  const cartProducts = useSelector((state) => state.cart.cartItems);
  const totalAmount = useSelector((state) => state.cart.totalAmount);

  const toggleCart = () => {
    dispatch(cartUiActions.toggle());
  };
  return (
    <div className='cart__container'>
      <ListGroup className='cart'>
        <div className='cart__close' onClick={toggleCart}>
          <span>
            <i class='ri-close-fill'></i>
          </span>
        </div>

        <div className='cart__item-list'>
          {cartProducts.length === 0 ? (
            <h6 className='text-center mt-5'>Uw Winkelwagen is leeg</h6>
          ) : (
            cartProducts.map((item, index) => (
              <CartItem item={item} key={index} />
            ))
          )}
        </div>

        <div className='cart__bottom d-flex align-items-center justify-content-between'>
          <h6>
            totaal :{' '}
            <span>€{(Math.round(totalAmount * 100) / 100).toFixed(2)}</span>
          </h6>
          <button onClick={toggleCart}>
            <Link to='/checkout'>uitbetalen</Link>
          </button>
        </div>
      </ListGroup>
    </div>
  );
};

export default Carts;
