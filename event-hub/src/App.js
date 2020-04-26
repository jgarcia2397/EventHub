import React from 'react';
import { Route } from 'react-router-dom';

import Layout from './hoc/Layout/Layout';
import EventHub from './containers/EventHub/EventHub';
import EventForm from './containers/EventForm/EventForm';
import Auth from './containers/Auth/Auth';

const App = () => {
  return (
    <div className="App">
      <Layout>
          <Route path="/createEventForm" component={EventForm} />
          <Route path="/auth" component={Auth} />
          <Route path="/" exact component={EventHub} />
      </Layout>
    </div>
  );
}

export default App;
