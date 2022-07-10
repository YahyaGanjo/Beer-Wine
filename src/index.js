import React from 'react';
import ReactDOM from 'react-dom';

import App from './App';
import 'bootstrap/dist/css/bootstrap.css';
import 'remixicon/fonts/remixicon.css';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import './index.css';
import 'dotenv/config';
import { AuthContextProvider } from './store/auth-context';

import store from './store/store';
import { Provider } from 'react-redux';

import { BrowserRouter as Router } from 'react-router-dom';

ReactDOM.render(
  <React.StrictMode>
    <AuthContextProvider>
      <Router>
        <Provider store={store}>
          <App />
        </Provider>
      </Router>
    </AuthContextProvider>
  </React.StrictMode>,
  document.getElementById('root')
);
