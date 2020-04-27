import React, { Component } from 'react';
import axios from 'axios';

import classes from './Auth.module.css';
import Input from '../../components/UI/Input/Input';

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
        isSignUp: true
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

    signInHandler = (event) => {
        event.preventDefault();
        
        const authData = {
            email: this.state.authForm.email.value,
            password: this.state.authForm.password.value,
            returnSecureToken: true
        }

        let url = 'https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=AIzaSyCMiumycDHNEhxQSSL7DtlXTQioeLYKKJc';
        if (!this.state.isSignUp) {
            url = 'https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=AIzaSyCMiumycDHNEhxQSSL7DtlXTQioeLYKKJc';
        }
        
        axios.post(url, authData)
            .then(response => {
                console.log(response);
            })
            .catch(err => {
                console.log(err);
            });
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

        return (
            <div className={classes.Auth}>
                {form}
                <div className={classes.AuthSwitch}>
                    <label>{this.state.isSignUp ? 'Already have an account? Sign in now!' : 'Don\'t have an account? Sign up now!'}</label>
                    <button onClick={this.switchAuthModeHandler}>SWITCH TO {this.state.isSignUp ? 'SIGN IN' : 'SIGN UP'}</button>
                </div>
            </div>
        );
    }
}

export default Auth;