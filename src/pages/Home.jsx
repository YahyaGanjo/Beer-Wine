import { useState, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import Helmet from '../components/Helmet/Helmet.js';
import { Container, Row, Col } from 'reactstrap';

import heroImg from '../assets/images/Matthews_Liquor_-_Beer_and_Cider-3.png';
import map from '../assets/images/mapimage.png';
import '../styles/hero-section.css';
import postcodes from '../assets/fake-data/postcodes.js';
import Modal from '../components/UI/common-section/Modal';

import '../styles/home.css';

import featureImg01 from '../assets/images/bestel-online.png';
import featureImg02 from '../assets/images/service-01.png';
import featureImg03 from '../assets/images/18.png';
import { db } from '../initFirebase.js';
import { update, ref, push, child } from 'firebase/database';

import TestimonialSlider from '../components/UI/slider/TestimonialSlider.jsx';

const featureData = [
  {
    title: 'Gemakkelijk Besteld',
    imgUrl: featureImg01,
    desc: 'Een lege koelkast? Maar nog zin in een feestje of onverwachts visite? Bestel je drankjes snel en eenvoudig in onze webshop',
  },
  {
    title: 'Snel Bezorgd',
    imgUrl: featureImg02,
    desc: 'de bezorger staat binnen 30 tot 40 minuten voor je deur. Als je geluk hebt, is de bezorger zelfs sneller!',
  },
  {
    title: '+ 18',
    imgUrl: featureImg03,
    desc: 'Geen 18? Geen alcohol! Bij twijfel = Legitimatie verplicht!',
  },
];

const Home = () => {
  const nameRef = useRef();
  const reviewRef = useRef();
  const [postcode, setPostcode] = useState('');
  const [showPostcode, setShowPostcode] = useState(false);
  const [showReview, setShowReview] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const navigate = useNavigate();

  const handlePostcode = (event) => {
    event.preventDefault();
    const numbersOnly = postcode.replace(/[^\d.-]/g, '');
    if (postcodes.includes(numbersOnly)) {
      navigate('/producten');
    } else {
      setShowPostcode(true);
    }
    setPostcode('');
  };
  const postcodeOnChangeHandler = (event) => {
    setPostcode(event.target.value);
  };

  const submitHandler = (e) => {
    e.preventDefault();
    setShowModal(false);
    setIsLoading(true);
    const enteredName = nameRef.current.value;
    const enteredReview = reviewRef.current.value;
    if (enteredReview.trim() === '') {
      setIsLoading(false);
      return;
    }
    let name;
    enteredName.trim() === '' ? (name = 'Anoniem') : (name = enteredName);
    const nowDate = new Date();
    const date =
      nowDate.getFullYear() +
      '/' +
      (nowDate.getMonth() + 1) +
      '/' +
      nowDate.getDate();
    const postData = {
      name,
      review: enteredReview,
      date,
      selected: false,
      new: true,
    };
    const newPostKey = push(child(ref(db), 'reviews')).key;
    const updates = {};
    updates['/reviews/' + newPostKey] = postData;
    update(ref(db), updates);
    setIsLoading(false);
  };
  return (
    <Helmet title='Home'>
      <section id='home'>
        {showPostcode && (
          <Modal>
            <h5>
              Helaas! Bezorgen we niet in jouw regio, maar je kan ons altijd
              bellen om de mogelijkheden te bespreken
            </h5>
            <h4 className='phone'>06-84045272</h4>
            <button
              className='bel_ons-btn'
              onClick={() => setShowPostcode(false)}
            >
              Sluiten
            </button>
          </Modal>
        )}
        {showModal && (
          <Modal>
            <Col lg='6' md='6' sm='12' className='m-auto text-center'>
              <form className='review-container' onSubmit={submitHandler}>
                <div>
                  <input type='text' placeholder='Naam' ref={nameRef} />
                </div>
                <div className='review-field'>
                  <textarea
                    name='beoordeling'
                    placeholder='Max 250 letters'
                    maxLength={250}
                    ref={reviewRef}
                    rows='10'
                  ></textarea>
                </div>
                {!isLoading && (
                  <div style={{ display: 'flex', gap: '18px' }}>
                    <button
                      className='bel_ons-btn'
                      onClick={() => setShowReview(true)}
                    >
                      Verzend
                    </button>
                    <button
                      className='bel_ons-btn'
                      onClick={() => setShowModal(false)}
                    >
                      Sluiten
                    </button>
                  </div>
                )}
                {isLoading && <p>Verwerken</p>}
              </form>
            </Col>
          </Modal>
        )}
        {showReview && (
          <Modal>
            <h5>Bedank voor je beoordeling</h5>
            <button
              className='bel_ons-btn'
              onClick={() => setShowReview(false)}
            >
              Sluiten
            </button>
          </Modal>
        )}
        <Container>
          <Row>
            <Col lg='6' md='6'>
              <div className='hero__content  '>
                <h1 className='mb-3'>BierWijn-Taxi.nl</h1>
                <h2 className='mb-4 hero__title'>
                  <span>GEKOELD GELEVERD!</span> Dranken <br /> Binnen 40 min
                  thuisbezorgd
                </h2>
                <div className='hero__btns d-flex align-items-center gap-5 mt-4'>
                  <input
                    type='text'
                    placeholder='Postcode'
                    value={postcode}
                    onChange={postcodeOnChangeHandler}
                  />
                  <button className='bel_ons-btn' onClick={handlePostcode}>
                    Bestel Online
                  </button>
                </div>

                <div className=' hero__service  d-flex align-items-center gap-5 mt-5 '>
                  <p className=' d-flex align-items-center gap-2 '>
                    <span className='shipping__icon'>
                      <i class='ri-car-line'></i>
                    </span>{' '}
                    Gratis bezorging vanaf €50
                  </p>

                  <p className=' d-flex align-items-center gap-2 '>
                    <span className='shipping__icon'>
                      <i class='ri-shield-check-line'></i>
                    </span>{' '}
                    Bezorging vanaf €20
                  </p>
                </div>
              </div>
            </Col>

            <Col lg='6' md='6'>
              <div className='hero__img'>
                <img src={heroImg} alt='hero-img' className='w-100' />
              </div>
            </Col>
          </Row>
        </Container>
      </section>

      <section id='overOns'>
        <Container>
          <Row>
            <Col lg='12' className='text-center'>
              <h5 className='feature__subtitle mb-4'>Wat we serveren?</h5>
              <h2 className='feature__title'>Gewoon lekker thuis zitten</h2>
              <h2 className='feature__title'>
                wij zullen <span>ervoor zorgen</span>
              </h2>
              <p className='mb-1 mt-4 feature__text'>
                Wij hebben een bezorgservice van gemiddeld 30 minuten, heldere
                en scherpe prijzen en contant is mogelijk! Bier bestellen in
                betuwe regio is nog nooit zo makkelijk geweest! Contact met ons
                opnemen kan telefonische via 06-84045272 maar ook via Whatsapp!
                <br />
                Betaal direct online, snel en veilig met iDEAL. Zo hoef je aan
                de deur niets meer af te rekenen.
                <br />
                wil je toch contant betalen bij de bezorging van je bestelling?
                geen zorgen, dat doen we ook!
              </p>
            </Col>

            {featureData.map((item, index) => (
              <Col lg='4' md='6' sm='6' key={index} className='mt-5 feature'>
                <div className='feature__item text-center px-5 py-3'>
                  <img
                    src={item.imgUrl}
                    alt='feature-img'
                    className='w-25 mb-3'
                  />
                  <h5 className=' fw-bold mb-3'>{item.title}</h5>
                  <p>{item.desc}</p>
                </div>
              </Col>
            ))}
          </Row>
        </Container>
      </section>

      <section id='postCode' className='why__choose-us'>
        <Container>
          <div class='row ruimte'>
            <Col>
              <div className='why__tasty-treat'>
                <h2 className='tasty__treat-title mb-4'>
                  We hebben een ruim <span>bezorgengebied!</span>
                </h2>
                <p className='tasty__treat-desc'>
                  Vul eenvoudig je postcode in, dan kan je direct bij ons
                  bestellen! wordt je postcode niet geaccepteerd? je kan ons
                  altijd bellen om de mogelijkheden te bespreken 06-84045272. We
                  vinden het geen enkel probleem om een stukje verder te rijden.
                </p>
              </div>
            </Col>
            <Col class='col-md-8'>
              <img src={map} alt='map-img' className='w-100' />
            </Col>
          </div>
        </Container>
      </section>

      <section id='beoordelingen'>
        <Container>
          <Row>
            <Col lg='6'>
              <div className='testimonial '>
                <h5 className='testimonial__subtitle mb-4'>Beoordelingen</h5>
                <h2 className='testimonial__title mb-4'>
                  Wat onze <span>klanten</span> zeggen
                </h2>
                <TestimonialSlider />
              </div>
              <button
                className='bel_ons-btn'
                onClick={() => setShowModal(true)}
              >
                Voeg recensie toe
              </button>
            </Col>
          </Row>
        </Container>
      </section>
    </Helmet>
  );
};

export default Home;
