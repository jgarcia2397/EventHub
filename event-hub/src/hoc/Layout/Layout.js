import React, { Component } from 'react';
import { connect } from 'react-redux';

import Auxiliary from '../Auxiliary/Auxiliary';
import Toolbar from '../../components/Navigation/Toolbar/Toolbar';
import classes from './Layout.module.css';
import * as actions from '../../store/actions/index';

class Layout extends Component {
    render () {
        return (
            <Auxiliary>
                <Toolbar 
                    auth={this.props.isAuthenticated}
                    onCreateEvent={this.props.onInitCreateEvent} />
                <main className={classes.Content}>
                    {this.props.children}
                </main>
            </Auxiliary>
        );
    }
};

const mapStateToProps = state => {
    return {
        isAuthenticated: state.auth.token !== null
    };
};

const mapDispatchToProps = dispatch => {
    return {
        onInitCreateEvent: () => dispatch(actions.createEventInit())
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(Layout);