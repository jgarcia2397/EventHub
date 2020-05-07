import React, { Component } from 'react';
import { Route, withRouter, Redirect } from 'react-router-dom';
import { connect } from 'react-redux';

import * as actions from './store/actions/index';
import Layout from './hoc/Layout/Layout';
import EventHub from './containers/EventHub/EventHub';
import EventForm from './containers/EventForm/EventForm';
import GroupChats from './containers/GroupChats/GroupChats';
import Auth from './containers/Auth/Auth';
import Logout from './containers/Auth/Logout/Logout';
import Auxiliary from './hoc/Auxiliary/Auxiliary';

class App extends Component {
  componentDidMount() {
    this.props.onAutoSignIn();
  }

  render () {
    let routes = (
      <Auxiliary>
        <Route path="/createEventForm" component={EventForm} />
        <Route path="/auth" component={Auth} />
        <Route path="/" exact component={EventHub} />
        <Redirect to="/" />
      </Auxiliary>
    );

    if (this.props.isAuthenticated) {
      routes = (
        <Auxiliary>
          <Route path="/createEventForm" component={EventForm} />
          <Route path="/auth" component={Auth} />
          <Route path="/chats" component={GroupChats} />
          <Route path="/logout" component={Logout} />
          <Route path="/" exact component={EventHub} />
          <Redirect to="/" />
        </Auxiliary>
      );
    }

    return (
      <div className="App">
        <Layout>
          {routes}
        </Layout>
      </div>
    );
  }
}

const mapStateToProps = state => {
  return {
    isAuthenticated: state.auth.token !== null
  };
};

const mapDispatchToProps = dispatch => {
  return {
    onAutoSignIn: () => dispatch(actions.authCheckState())
  };
};

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(App));
