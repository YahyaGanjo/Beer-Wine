import React, { useContext, useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import AuthContext from '../store/auth-context';
import '../styles/admin.css';
import Helmet from '../components/Helmet/Helmet';

const Admin = () => {
  const navigate = useNavigate();
  const [newReviews, setNewReviews] = useState([]);
  const authCtx = useContext(AuthContext);
  const logoutHandler = () => {
    authCtx.logout();
    navigate('/home');
  };

  useEffect(() => {
    fetch(
      'https://one-project-36fc7-default-rtdb.europe-west1.firebasedatabase.app/reviews.json',
      {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
        },
      }
    )
      .then((res) => {
        if (res.ok) {
          return res.json();
        } else {
          return res.json().then((data) => {
            let errorMessage = 'Iets misgegaan!';
            if (data && data.error && data.error.message) {
              errorMessage = data.error.message;
            }

            throw new Error(errorMessage);
          });
        }
      })
      .then((data) => {
        if (!data) {
          return;
        }
        const reviews = Object.entries(data);
        const selectedReviews = reviews.filter((review) => {
          return review[1].new;
        });
        setNewReviews(selectedReviews);
      })
      .catch((err) => {
        alert(err.message);
      });
  }, []);

  const deleteHandler = (review) => {
    fetch(
      `https://one-project-36fc7-default-rtdb.europe-west1.firebasedatabase.app/reviews/${review[0]}.json`,
      {
        method: 'DELETE',
        headers: {
          'Content-Type': 'application/json',
        },
      }
    )
      .then((res) => {
        if (res.ok) {
          return res.json();
        } else {
          return res.json().then((data) => {
            let errorMessage = 'Iets misgegaan!';
            if (data && data.error && data.error.message) {
              errorMessage = data.error.message;
            }

            throw new Error(errorMessage);
          });
        }
      })
      .catch((err) => {
        alert(err.message);
      });
  };
  const selectHandler = (review) => {
    fetch(
      `https://one-project-36fc7-default-rtdb.europe-west1.firebasedatabase.app/reviews/${review[0]}.json`,
      {
        method: 'PUT',
        body: JSON.stringify({
          name: review[1].name,
          review: review[1].review,
          date: review[1].date,
          selected: true,
          new: false,
        }),
        headers: {
          'Content-Type': 'application/json',
        },
      }
    )
      .then((res) => {
        if (res.ok) {
          return res.json();
        } else {
          return res.json().then((data) => {
            let errorMessage = 'Iets misgegaan!';
            if (data && data.error && data.error.message) {
              errorMessage = data.error.message;
            }

            throw new Error(errorMessage);
          });
        }
      })
      .catch((err) => {
        alert(err.message);
      });
  };
  return (
    <Helmet title='Admin'>
      <button className='logout-btn' onClick={logoutHandler}>
        Uitloggen
      </button>
      <section style={{ width: '20%', margin: '0 auto' }}>
        <div class='form-check'>
          <input
            class='form-check-input'
            type='radio'
            name='flexRadioDefault'
            id='flexRadioDefault1'
          ></input>
          <label class='form-check-label' for='flexRadioDefault1'>
            Open Bezorging
          </label>
        </div>
        <div class='form-check'>
          <input
            class='form-check-input'
            type='radio'
            name='flexRadioDefault'
            id='flexRadioDefault2'
            checked
          ></input>
          <label class='form-check-label' for='flexRadioDefault2'>
            Eindig Bezorging
          </label>
        </div>
      </section>
      <div>
        {newReviews.map((review) => {
          return (
            <div className='reviews-container'>
              <h5>Beoordeling:</h5>
              <p>{review[1].review}</p>
              <div className=' slider__content d-flex align-items-center gap-3 '>
                <h5>Datum & Naam :</h5>
                <h6>{review[1].date}</h6>
                <h6>{review[1].name}</h6>
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
    </Helmet>
  );
};

export default Admin;
