import React from 'react';
import { Route } from 'react-router-dom';

import Layout from './hoc/Layout/Layout';
import EventHub from './containers/EventHub/EventHub';
import EventForm from './containers/EventForm/EventForm';
import GroupChats from './containers/GroupChats/GroupChats';
import Auth from './containers/Auth/Auth';
import Logout from './containers/Auth/Logout/Logout';

const App = () => {
  return (
    <div className="App">
      <Layout>
          <Route path="/createEventForm" component={EventForm} />
          <Route path="/auth" component={Auth} />
          <Route path="/chats" component={GroupChats} />
          <Route path="/logout" component={Logout} />
          <Route path="/" exact component={EventHub} />
      </Layout>
    </div>
  );
}

export default App;
