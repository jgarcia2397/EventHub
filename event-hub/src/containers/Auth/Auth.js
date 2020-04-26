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
                    required: true
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
                    required: true
                },
                valid: false,
                touched: false
            }
        }
    }

    signInHandler = (event) => {
        event.preventDefault();
        this.props.history.push('/');
    }

    inputChangedHandler = (event, inputIdentifier) => {}

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