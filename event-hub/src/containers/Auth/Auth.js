import React, { Component } from 'react';

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

    signInHandler = (event) => {
        event.preventDefault();
        this.props.history.push('/');
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
                <button>SIGN IN</button>
            </form>
        );

        return (
            <div className={classes.Auth}>
                {form}
            </div>
        );
    }
}

export default Auth;