import React from 'react';

import Layout from './hoc/Layout/Layout';
import Calendar from './containers/EventHub/EventHub';

const App = () => {
  return (
    <div className="App">
      <Layout>
        <Calendar />
      </Layout>
    </div>
  );
}

export default App;
