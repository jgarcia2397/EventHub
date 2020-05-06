import React, { Component } from 'react';
import { connect } from 'react-redux';

import Auxiliary from '../Auxiliary/Auxiliary';
import Toolbar from '../../components/Navigation/Toolbar/Toolbar';
import classes from './Layout.module.css';

class Layout extends Component {
    render () {
        return (
            <Auxiliary>
                <Toolbar auth={this.props.isAuthenticated} />
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

export default connect(mapStateToProps)(Layout);