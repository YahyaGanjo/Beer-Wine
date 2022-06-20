import React from 'react';
import { useState, useEffect } from 'react';
import Helmet from '../components/Helmet/Helmet';
import CommonSection from '../components/UI/common-section/CommonSection';

import { Container, Row, Col } from 'reactstrap';

import products from '../assets/fake-data/products';
import ProductCard from '../components/UI/product-card/ProductCard';

import '../styles/all-foods.css';
import '../styles/pagination.css';

const AllFoods = () => {
  const [category, setCategory] = useState('ALLES');
  const [allProducts, setAllProducts] = useState(products);

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

    if (category === 'MIX') {
      const filteredProducts = products.filter(
        (item) => item.category === 'Mix'
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
            <Col lg='12'>
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
                    category === 'MIX' ? 'foodBtnActive' : ''
                  } `}
                  onClick={() => setCategory('MIX')}
                >
                  Mix
                </button>
              </div>
            </Col>

            {allProducts.map((item) => (
              <Col lg='3' md='4' sm='6' xs='6' key={item.id} className='mb-4'>
                <ProductCard item={item} />
              </Col>
            ))}
          </Row>
        </Container>
      </section>
    </Helmet>
  );
};

export default AllFoods;
