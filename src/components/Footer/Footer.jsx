import React from 'react';
import { Container, Row, Col, ListGroup, ListGroupItem } from 'reactstrap';
import logo from '../../assets/images/logo11.png';

import '../../styles/footer.css';

const Footer = () => {
  return (
    <footer className='footer'>
      <Container>
        <Row>
          <Col lg='3' md='4' sm='6'>
            <div className=' footer__logo text-start'>
              <img src={logo} alt='logo' />
              <h5>BierWijn-Taxi</h5>
            </div>
          </Col>

          <Col lg='3' md='4' sm='6'>
            <h5 className='footer__title'>Bezorg Tijd</h5>
            <ListGroup className='deliver__time-list'>
              <ListGroupItem className=' delivery__time-item border-0 ps-0'>
                <span>Maandag:&nbsp;&nbsp;&nbsp;&nbsp;10:00pm - 03:00am</span>
                <br />
                <span>
                  Dinsdag:&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;10:00pm - 03:00am
                </span>
                <br />
                <span>Woensdag:&nbsp;&nbsp;10:00pm - 03:00am</span>
                <br />
                <span>Donderdag:&nbsp;10:00pm - 03:00am</span>
                <br />
                <span>
                  Vrijdag:&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;10:00pm -
                  03:00am
                </span>
                <br />
                <span>Zaterdag:&nbsp;&nbsp;&nbsp;&nbsp;10:00pm - 03:00am</span>
                <br />
                <span>
                  Zondag:&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;10:00pm - 03:00am
                </span>
                <br />
              </ListGroupItem>
            </ListGroup>
          </Col>

          <Col lg='3' md='4' sm='6'>
            <h5 className='footer__title'>Contact</h5>
            <ListGroup className='deliver__time-list'>
              <ListGroupItem className=' delivery__time-item border-0 ps-0'>
                <span>Locatie: Heteren</span>
              </ListGroupItem>
              <ListGroupItem className=' delivery__time-item border-0 ps-0'>
                <span>Telefoon: 06-84045272</span>
              </ListGroupItem>

              <ListGroupItem className=' delivery__time-item border-0 ps-0'>
                <span>Email: kevorkianara73@gmail.com</span>
              </ListGroupItem>
              <ListGroupItem className=' delivery__time-item border-0 ps-0'>
                <span>KNK-nummer: 86762737</span>
              </ListGroupItem>
            </ListGroup>
          </Col>

          <Col lg='3' md='4' sm='6'>
            <h5 className='footer__title'>Nieuwsbrief</h5>
            <p>Schrijf je in op onze nieuwsbrief</p>
            <div className='newsletter'>
              <input type='email' placeholder='Enter your email' />
              <span>
                <i class='ri-send-plane-line'></i>
              </span>
            </div>
          </Col>
        </Row>

        <Row className='mt-5'>
          <Col lg='6' md='6'>
            <p className='copyright__text'>
              Copyright - 2022, website made by Labs Tech. All Rights Reserved.
            </p>
          </Col>
          <Col lg='6' md='6'>
            <div className='social__links d-flex align-items-center gap-4 justify-content-end'>
              <p className='m-0'>Follow: </p>
              <span>
                {' '}
                <a
                  target='_blank'
                  rel='noopener noreferrer'
                  href='https://www.facebook.com/BierWijn-Taxi-110321745064957'
                >
                  <i class='ri-facebook-line'></i>
                </a>{' '}
              </span>

              <span>
                <a
                  target='_blank'
                  rel='noopener noreferrer'
                  href='https://www.facebook.com/BierWijn-Taxi-110321745064957'
                >
                  <i class='ri-github-line'></i>
                </a>
              </span>

              <span>
                {' '}
                <a
                  target='_blank'
                  rel='noopener noreferrer'
                  href='https://www.facebook.com/BierWijn-Taxi-110321745064957'
                >
                  <i class='ri-youtube-line'></i>
                </a>{' '}
              </span>

              <span>
                {' '}
                <a
                  target='_blank'
                  rel='noopener noreferrer'
                  href='https://www.facebook.com/BierWijn-Taxi-110321745064957'
                >
                  <i class='ri-linkedin-line'></i>
                </a>{' '}
              </span>
            </div>
          </Col>
        </Row>
      </Container>
    </footer>
  );
};

export default Footer;
