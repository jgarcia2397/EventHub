import React from 'react';
import { Route } from 'react-router-dom';

import Layout from './hoc/Layout/Layout';
import EventHub from './containers/EventHub/EventHub';
import EventForm from './containers/EventForm/EventForm';

const App = () => {
  return (
    <div className="App">
      <Layout>
        <Route path="/" exact component={EventHub} />
        <Route path="/createEventForm" component={EventForm} />
      </Layout>
    </div>
  );
}

export default App;
