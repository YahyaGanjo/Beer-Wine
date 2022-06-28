import React, { useRef, useEffect, useState } from 'react';

import { Container } from 'reactstrap';
import logo from '../../assets/images/logo.png';
import { HashLink as Link } from 'react-router-hash-link';
import { useSelector, useDispatch } from 'react-redux';
import useWindowDimensions from '../Hooks/useWindowDimensions';

import { cartUiActions } from '../../store/shopping-cart/cartUiSlice';

import '../../styles/header.css';

const Header = () => {
  const menuRef = useRef(null);
  const headerRef = useRef(null);
  const totalQuantity = useSelector((state) => state.cart.totalQuantity);
  const dispatch = useDispatch();
  const [showCart, setShowCart] = useState(false);

  const { width } = useWindowDimensions();

  useEffect(() => {
    width > 990 ? setShowCart(false) : setShowCart(true);
  }, [width]);

  const toggleMenu = () => menuRef.current.classList.toggle('show__menu');

  const toggleCart = () => {
    dispatch(cartUiActions.toggle());
  };

  useEffect(() => {
    window.addEventListener('scroll', () => {
      if (
        document.body.scrollTop > 80 ||
        document.documentElement.scrollTop > 80
      ) {
        headerRef.current.classList.add('header__shrink');
      } else {
        headerRef.current.classList.remove('header__shrink');
      }
    });

    return () => window.removeEventListener('scroll');
  }, []);

  return (
    <header className='header' ref={headerRef}>
      <Container>
        <div className='nav__wrapper d-flex align-items-center justify-content-between'>
          <div className='logo'>
            <img src={logo} alt='logo' />
          </div>

          {/* ======= menu ======= */}
          <div className='navigation' ref={menuRef} onClick={toggleMenu}>
            <div className='menu d-flex align-items-center gap-5'>
              <Link to='/home#home'>Home</Link>
              <Link to='/producten'>Bestel Online</Link>
              <Link to='/home#overOns'>Over Ons</Link>
              <Link to='/home#beoordelingen'>Beoordelingen</Link>
              <Link to='/contact'>Contact</Link>
            </div>
          </div>

          {/* ======== nav right icons ========= */}
          <div className='nav__right d-flex align-items-center gap-4'>
            {showCart && (
              <span className='cart__icon' onClick={toggleCart}>
                <i class='ri-shopping-basket-line'></i>
                <span className='cart__badge'>{totalQuantity}</span>
              </span>
            )}

            <span className='user'>
              <Link to='/login'>
                <i class='ri-user-line'></i>
              </Link>
            </span>

            <span className='mobile__menu' onClick={toggleMenu}>
              <i class='ri-menu-line'></i>
            </span>
          </div>
        </div>
      </Container>
    </header>
  );
};

export default Header;
