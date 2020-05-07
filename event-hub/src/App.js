import React, { Component } from 'react';
import { Route, withRouter } from 'react-router-dom';
import { connect } from 'react-redux';

import * as actions from './store/actions/index';
import Layout from './hoc/Layout/Layout';
import EventHub from './containers/EventHub/EventHub';
import EventForm from './containers/EventForm/EventForm';
import GroupChats from './containers/GroupChats/GroupChats';
import Auth from './containers/Auth/Auth';
import Logout from './containers/Auth/Logout/Logout';

class App extends Component {
  componentDidMount() {
    this.props.onAutoSignIn();
  }

  render () {
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
}

const mapDispatchToProps = dispatch => {
  return {
    onAutoSignIn: () => dispatch(actions.authCheckState())
  };
};

export default withRouter(connect(null, mapDispatchToProps)(App));
