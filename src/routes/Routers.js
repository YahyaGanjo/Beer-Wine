import React, { useContext } from 'react';
import { Route, Routes, Navigate } from 'react-router-dom';

import Home from '../pages/Home';
import AllFoods from '../pages/AllFoods';
import FoodDetails from '../pages/FoodDetails';
import Contact from '../pages/Contact';
import Login from '../pages/Login';
import Success from '../pages/Success';
import AuthContext from '../store/auth-context';
import Admin from '../pages/Admin';
import Checkout from '../pages/Checkout';

const Routers = () => {
  const authCtx = useContext(AuthContext);
  return (
    <Routes>
      <Route path='/' element={<Navigate to='/home' />} />
      <Route path='/home' element={<Home />} />
      <Route path='/producten' element={<AllFoods />} />
      <Route path='/producten/:id' element={<FoodDetails />} />
      <Route path='/checkout' element={<Checkout />} />
      <Route path='/login' element={<Login />} />
      <Route path='/contact' element={<Contact />} />
      <Route path='/success' element={<Success />} />
      <Route
        path='/admin'
        element={authCtx.isLoggedIn ? <Home /> : <Admin />}
      ></Route>
      <Route path='*' element={<Navigate to='/home' />} />
    </Routes>
  );
};

export default Routers;
