import React, { useRef, useState, useContext } from 'react';
import Helmet from '../components/Helmet/Helmet';
import CommonSection from '../components/UI/common-section/CommonSection';
import { Container, Row, Col } from 'reactstrap';
import { useNavigate } from 'react-router-dom';
import AuthContext from '../store/auth-context';
import Modal from '../components/UI/common-section/Modal';
import { signInWithEmailAndPassword } from 'firebase/auth';
import { auth } from '../initFirebase';

const Login = () => {
  const loginNameRef = useRef();
  const loginPasswordRef = useRef();
  const [message, setMessage] = useState('');
  const [showModal, setShowModal] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const authCtx = useContext(AuthContext);
  const navigate = useNavigate();

  const submitHandler = (e) => {
    e.preventDefault();

    const enteredEmail = loginNameRef.current.value;
    const enteredPassword = loginPasswordRef.current.value;

    setIsLoading(true);

    signInWithEmailAndPassword(auth, enteredEmail, enteredPassword)
      .then((userCredential) => {
        // Signed in
        const expirationTime = new Date(
          new Date().getTime() + +userCredential._tokenResponse.expiresIn * 1000
        );
        authCtx.login(
          userCredential._tokenResponse.idToken,
          expirationTime.toISOString()
        );
        navigate('/admin');
        // ...
      })
      .catch((error) => {
        setShowModal(true);
        setMessage(error.message);
        setIsLoading(false);
      });
  };

  return (
    <Helmet title='Login'>
      <CommonSection title='Login' />
      {showModal && (
        <Modal>
          <h5>{message}</h5>
          <button className='bel_ons-btn' onClick={() => setShowModal(false)}>
            Sluiten
          </button>
        </Modal>
      )}
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
