import React from 'react';
import { useState, useEffect } from 'react';
import Helmet from '../components/Helmet/Helmet';
import CommonSection from '../components/UI/common-section/CommonSection';

import { Container, Row, Col } from 'reactstrap';

import products from '../assets/fake-data/products';
import ProductCard from '../components/UI/product-card/ProductCard';
import CartNew from '../components/UI/cart/CartNew';
import useWindowDimensions from '../components/Hooks/useWindowDimensions';
import '../styles/all-foods.css';
import '../styles/pagination.css';

const AllFoods = () => {
  const [category, setCategory] = useState('ALLES');
  const [allProducts, setAllProducts] = useState(products);
  const [showCart, setShowCart] = useState(false);
  const { width } = useWindowDimensions();

  useEffect(() => {
    width > 990 ? setShowCart(true) : setShowCart(false);
  }, [width]);

  useEffect(() => {
    if (category === 'ALLES') {
      setAllProducts(products);
    }

    if (category === 'BIER') {
      const filteredProducts = products.filter(
        (item) => item.category === 'Bier'
      );

      setAllProducts(filteredProducts);
    }

    if (category === 'WIJN') {
      const filteredProducts = products.filter(
        (item) => item.category === 'Wijn'
      );

      setAllProducts(filteredProducts);
    }

    if (category === 'MIXDRANKEN') {
      const filteredProducts = products.filter(
        (item) => item.category === 'Mix Dranken'
      );

      setAllProducts(filteredProducts);
    }

    if (category === 'CHIPS') {
      const filteredProducts = products.filter(
        (item) => item.category === 'Chips'
      );

      setAllProducts(filteredProducts);
    }

    if (category === 'FLUGEL') {
      const filteredProducts = products.filter(
        (item) => item.category === 'Flugel'
      );

      setAllProducts(filteredProducts);
    }

    if (category === 'ENERGYDRANKEN') {
      const filteredProducts = products.filter(
        (item) => item.category === 'Energy Dranken'
      );

      setAllProducts(filteredProducts);
    }

    if (category === 'FRISDRANKEN') {
      const filteredProducts = products.filter(
        (item) => item.category === 'Fris Dranken'
      );

      setAllProducts(filteredProducts);
    }
  }, [category]);

  return (
    <Helmet title='Bestellen'>
      <CommonSection title='Alle Producten' />

      <section>
        <Container>
          <Row>
            <Col lg='10'>
              <Row>
                <Col lg='10' md='12'>
                  <div className='food__category d-flex align-items-center justify-content-center gap-4'>
                    <button
                      className={`all__btn  ${
                        category === 'ALLES' ? 'foodBtnActive' : ''
                      } `}
                      onClick={() => setCategory('ALLES')}
                    >
                      Alles
                    </button>
                    <button
                      className={`d-flex align-items-center gap-2 ${
                        category === 'BIER' ? 'foodBtnActive' : ''
                      } `}
                      onClick={() => setCategory('BIER')}
                    >
                      Bier
                    </button>

                    <button
                      className={`d-flex align-items-center gap-2 ${
                        category === 'WIJN' ? 'foodBtnActive' : ''
                      } `}
                      onClick={() => setCategory('WIJN')}
                    >
                      Wijn
                    </button>

                    <button
                      className={`d-flex align-items-center gap-2 ${
                        category === 'MIXDRANKEN' ? 'foodBtnActive' : ''
                      } `}
                      onClick={() => setCategory('MIXDRANKEN')}
                    >
                      Mix Dranken
                    </button>

                    <button
                      className={`d-flex align-items-center gap-2 ${
                        category === 'CHIPS' ? 'foodBtnActive' : ''
                      } `}
                      onClick={() => setCategory('CHIPS')}
                    >
                      Chips
                    </button>

                    <button
                      className={`d-flex align-items-center gap-2 ${
                        category === 'FLUGEL' ? 'foodBtnActive' : ''
                      } `}
                      onClick={() => setCategory('FLUGEL')}
                    >
                      Flugel
                    </button>

                    <button
                      className={`d-flex align-items-center gap-2 ${
                        category === 'ENERGYDRANKEN' ? 'foodBtnActive' : ''
                      } `}
                      onClick={() => setCategory('ENERGYDRANKEN')}
                    >
                      Energy Dranken
                    </button>
                    <button
                      className={`d-flex align-items-center gap-2 ${
                        category === 'FRISDRANKEN' ? 'foodBtnActive' : ''
                      } `}
                      onClick={() => setCategory('FRISDRANKEN')}
                    >
                      Fris Dranken
                    </button>
                  </div>
                </Col>
                {allProducts.map((item) => (
                  <Col
                    lg='5'
                    md='4'
                    sm='6'
                    xs='6'
                    key={item.id}
                    className='mb-4'
                  >
                    <ProductCard item={item} />
                  </Col>
                ))}
              </Row>
            </Col>
            {showCart && <CartNew />}
          </Row>
        </Container>
      </section>
    </Helmet>
  );
};

export default AllFoods;
