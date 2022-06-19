import Helmet from '../components/Helmet/Helmet.js';
import { Container, Row, Col } from 'reactstrap';

import heroImg from '../assets/images/borrel.jpg';
import map from '../assets/images/mapimage.jfif';
import '../styles/hero-section.css';
import { HashLink } from 'react-router-hash-link';

import '../styles/home.css';

import featureImg01 from '../assets/images/bestel-online.png';
import featureImg02 from '../assets/images/service-01.png';
import featureImg03 from '../assets/images/18.png';

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
  return (
    <Helmet title='Home'>
      <section id='home'>
        <Container>
          <Row>
            <Col lg='6' md='6'>
              <div className='hero__content  '>
                <h5 className='mb-3'>bierwijnbezorging.nl</h5>
                <h1 className='mb-4 hero__title'>
                  <span>GEKOELD GELEVERD!</span> Dranken <br /> Binnen 40 min
                  thuisbezorgd
                </h1>
                <div className='hero__btns d-flex align-items-center gap-5 mt-4'>
                  <input type='text' placeholder='Postcode' />
                  <button className='all__foods-btn'>
                    <HashLink to='/home#postCode'>Bestel Online</HashLink>
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
                    bezorging vanaf €20
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
          <Row class='row d-flex justify-content-center align-items-center'>
            <Col class='col-md-6'>
              <div className='why__tasty-treat'>
                <h2 className='tasty__treat-title mb-4'>
                  we hebben een ruim <span>bezorgengebied!</span>
                </h2>
                <p className='tasty__treat-desc'>
                  vul eenvoudig je postcode in, dan kan je direct bij ons
                  bestellen! wordt je postcode niet geaccepteerd? je kan ons
                  altijd bellen om de mogelijkheden te bespreken.We vinden het
                  geen enkel probleem om een stukje verder te rijden.
                </p>
                <button className='bel_ons-btn'>
                  <HashLink to='/home#postCode'>Bel ons direct</HashLink>
                </button>
              </div>
            </Col>
            <Col class='col-md-10'>
              <img src={map} alt='map-img' className='w-100' />
            </Col>
          </Row>
        </Container>
      </section>

      <section id='beoordelingen'>
        <Container>
          <Row>
            <Col lg='6' md='6'>
              <div className='testimonial '>
                <h5 className='testimonial__subtitle mb-4'>beoordelingen</h5>
                <h2 className='testimonial__title mb-4'>
                  Wat onze <span>klanten</span> zeggen
                </h2>
                <p className='testimonial__desc'>
                  Lorem ipsum dolor sit amet consectetur, adipisicing elit.
                  Distinctio quasi qui minus quos sit perspiciatis inventore
                  quis provident placeat fugiat!
                </p>

                <TestimonialSlider />
              </div>
            </Col>
          </Row>
        </Container>
      </section>
    </Helmet>
  );
};

export default Home;
