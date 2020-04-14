import React from 'react';

import Layout from './hoc/Layout/Layout';
import EventHub from './containers/EventHub/EventHub';

const App = () => {
  return (
    <div className="App">
      <Layout>
        <EventHub />
      </Layout>
    </div>
  );
}

export default App;
