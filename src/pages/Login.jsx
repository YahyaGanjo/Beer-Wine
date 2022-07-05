import React, { useRef, useState, useContext } from 'react';
import Helmet from '../components/Helmet/Helmet';
import CommonSection from '../components/UI/common-section/CommonSection';
import { Container, Row, Col } from 'reactstrap';
import { useNavigate } from 'react-router-dom';
import AuthContext from '../store/auth-context';

const Login = () => {
  const loginNameRef = useRef();
  const loginPasswordRef = useRef();
  const [isLoading, setIsLoading] = useState(false);
  const authCtx = useContext(AuthContext);
  const navigate = useNavigate();

  const submitHandler = (e) => {
    e.preventDefault();

    const enteredEmail = loginNameRef.current.value;
    const enteredPassword = loginPasswordRef.current.value;

    setIsLoading(true);

    fetch(
      'https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=AIzaSyB47NsZujsnouqbKgpUrkER-LDp66QA8Pc',
      {
        method: 'POST',
        body: JSON.stringify({
          email: enteredEmail,
          password: enteredPassword,
          returnSecureToken: true,
        }),
        headers: {
          'Content-Type': 'application/json',
        },
      }
    )
      .then((res) => {
        setIsLoading(false);
        if (res.ok) {
          return res.json();
        } else {
          return res.json().then((data) => {
            let errorMessage = 'Authenticatie mislukt!';
            if (data && data.error && data.error.message) {
              errorMessage = data.error.message;
            }

            throw new Error(errorMessage);
          });
        }
      })
      .then((data) => {
        const expirationTime = new Date(
          new Date().getTime() + +data.expiresIn * 1000
        );
        authCtx.login(data.idToken, expirationTime.toISOString());
        navigate('/admin');
      })
      .catch((err) => {
        alert(err.message);
      });
  };

  return (
    <Helmet title='Login'>
      <CommonSection title='Login' />
      <section>
        <Container>
          <Row>
            <Col lg='6' md='6' sm='12' className='m-auto text-center'>
              <form className='form mb-5' onSubmit={submitHandler}>
                <div className='form__group'>
                  <input
                    type='email'
                    placeholder='Email'
                    required
                    ref={loginNameRef}
                  />
                </div>
                <div className='form__group'>
                  <input
                    type='password'
                    placeholder='Password'
                    required
                    ref={loginPasswordRef}
                  />
                </div>
                {!isLoading && (
                  <button className='addTOCart__btn'>Inloggen</button>
                )}
                {isLoading && <p>Verzenden</p>}
              </form>
            </Col>
          </Row>
        </Container>
      </section>
    </Helmet>
  );
};

export default Login;
