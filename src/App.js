import React, { useEffect } from 'react';
import Layout from './components/Layout/Layout';

function App() {
  useEffect(() => {
    document.title = 'BierWijn-Taxi';
  });
  return <Layout />;
}

export default App;
