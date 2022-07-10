import React from 'react';

import { ListGroup } from 'reactstrap';
import { Link } from 'react-router-dom';
import CartItem from './CartItem';

import { useSelector } from 'react-redux';

import '../../../styles/shopping-cart-new.css';

const CartNew = () => {
  const cartProducts = useSelector((state) => state.cart.cartItems);
  const totalAmount = useSelector((state) => state.cart.totalAmount);

  return (
    <div className='cart__container1'>
      <ListGroup className='cart1'>
        <div className='cart__item-list1'>
          <h5 className='text-center mt-5'>Winkelwagen</h5>
          {cartProducts.length === 0 ? (
            <h6 className='text-center mt-5'>Uw Winkelwagen is leeg</h6>
          ) : (
            cartProducts.map((item, index) => (
              <CartItem item={item} key={index} />
            ))
          )}
        </div>

        <div className='cart__bottom1 d-flex align-items-center justify-content-between'>
          <h6>
            totaal :{' '}
            <span>€{(Math.round(totalAmount * 100) / 100).toFixed(2)}</span>
          </h6>
          <button>
            <Link to='/checkout'>uitbetalen</Link>
          </button>
        </div>
      </ListGroup>
    </div>
  );
};

export default CartNew;
