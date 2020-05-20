import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Redirect } from 'react-router-dom';

import * as actions from '../../store/actions/index';
import axios from '../../axios-events';
import errorHandler from '../../hoc/errorHandler/errorHandler';
import classes from './Auth.module.css';
import Input from '../../components/UI/Input/Input';
import Spinner from '../../components/UI/Spinner/Spinner';

class Auth extends Component {
    state = {
        authForm: {
            email: {
                elementType: 'input',
                elementConfig: {
                    type: 'email',
                    placeholder: 'ex. mailAddress@gmail.com',
                    label: "Email"
                },
                value: '',
                validation: {
                    required: true,
                    isEmail: true
                },
                valid: false,
                touched: false
            },
            password: {
                elementType: 'input',
                elementConfig: {
                    type: 'password',
                    placeholder: 'Password',
                    label: 'Password'
                },
                value: '',
                validation: {
                    required: true,
                    minLength: 8
                },
                valid: false,
                touched: false
            }
        },
        isSignUp: true,
        token: null,
        userId: null
    }

    componentDidMount() {
        if (!this.props.creatingEvent && this.props.authRedirectPath !== '/') {
            this.props.onSetAuthRedirectPath();
        }
    }

    checkTextInputValidity(value, rules) {
        let isValid = true;

        if (rules.required) {
            isValid = value.trim() !== '' && isValid;
        }
        if (rules.minLength) {
            isValid = (value.length > 0) && (value.length >= rules.minLength) && isValid;
        }
        if (rules.isEmail) {
            const pattern = /[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?/;
        isValid = pattern.test(value) && isValid;
        }

        return isValid;
    }

    authLogout = () => {
        this.setState({token: null, userId: null});
    }

    checkAuthTimeout = (expirationTime) => {
        setTimeout(() => {
            this.authLogout();
        }, expirationTime * 1000);
    }

    signInHandler = (event) => {
        event.preventDefault();
        this.props.onAuth(this.state.authForm.email.value, this.state.authForm.password.value, this.state.isSignUp);
    }

    switchAuthModeHandler = () => {
        this.setState(prevState => {
            return { isSignUp: !prevState.isSignUp }
        });
    }

    inputChangedHandler = (event, inputIdentifier) => {
        const updatedAuthForm = {
            ...this.state.authForm
        };

        const updatedFormElement = {
            ...updatedAuthForm[inputIdentifier]
        };

        updatedFormElement.value = event.target.value;

        updatedFormElement.touched = true;
        updatedAuthForm[inputIdentifier] = updatedFormElement;
        
        updatedFormElement.valid = this.checkTextInputValidity(updatedFormElement.value, updatedFormElement.validation);

        let formIsValid = true;
        for (let inputIdentifier in updatedAuthForm) {
            formIsValid = updatedAuthForm[inputIdentifier].valid && formIsValid;
        }

        this.setState({authForm: updatedAuthForm, formIsValid: formIsValid});
    }

    render () {
        const formElementsArray = [];
        for (let key in this.state.authForm) {
            formElementsArray.push({
                id: key,
                config: this.state.authForm[key]
            });
        }

        let form = (
            <form onSubmit={this.signInHandler}>
                {formElementsArray.map(formElement => (
                    <Input
                        key={formElement.id}
                        elementType={formElement.config.elementType} 
                        elementConfig={formElement.config.elementConfig} 
                        value={formElement.config.value}
                        invalidElement={!formElement.config.valid}
                        touched={formElement.config.touched}
                        changed={(event) => this.inputChangedHandler(event, formElement.id)} />
                ))}
                <button>{this.state.isSignUp ? 'SIGN UP' : 'SIGN IN'}</button>
            </form>
        );

        let authRedirect = null;
        if (this.props.isAuthenticated) {
            authRedirect = <Redirect to={this.props.authRedirectPath} />;
        }

        let authWindow = null;
        if (this.props.loading) {
            authWindow = <Spinner />;
        } else {
            authWindow = (
                <div className={classes.Auth}>
                    {authRedirect}
                    {form}
                    <div className={classes.AuthSwitch}>
                        <label>{this.state.isSignUp ? 'Already have an account? Sign in now!' : 'Don\'t have an account? Sign up now!'}</label>
                        <button onClick={this.switchAuthModeHandler}>SWITCH TO {this.state.isSignUp ? 'SIGN IN' : 'SIGN UP'}</button>
                    </div>
                </div>
            );
        }

        return (
            authWindow
        );
    }
}

const mapStateToProps = state => {
    return {
        isAuthenticated: state.auth.token !== null,
        creatingEvent: state.eventForm.creatingEvent,
        authRedirectPath: state.auth.authRedirectPath,
        loading: state.auth.loading
    };
}

const mapDispatchToProps = dispatch => {
    return {
        onAuth: (email, password, isSignup) => dispatch(actions.auth(email, password, isSignup)),
        onSetAuthRedirectPath: () => dispatch(actions.setAuthRedirectPath('/'))
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(errorHandler(Auth, axios));