import React, { Component } from 'react';

import classes from './EventForm.module.css';
import Input from '../../components/UI/Input/Input';
import axios from '../../axios-events';

class EventForm extends Component {

    state = {
        eventForm: {
            name: {
                elementType: 'input',
                elementConfig: {
                    type: 'text',
                    placeholder: 'Event Name',
                    label: "Enter the event name: "
                },
                value: '',
                validation: {
                    required: true
                },
                valid: false,
                touched: false
            },
            month: {
                elementType: 'select',
                elementConfig: {
                    label: "Enter date of the event: ",
                    options: [
                        {value: 'January', displayValue: 'January'}, 
                        {value: 'February', displayValue: 'February'},
                        {value: 'March', displayValue: 'March'},
                        {value: 'April', displayValue: 'April'},
                        {value: 'May', displayValue: 'May'},
                        {value: 'June', displayValue: 'June'},
                        {value: 'July', displayValue: 'July'},
                        {value: 'August', displayValue: 'August'},
                        {value: 'September', displayValue: 'September'},
                        {value: 'October', displayValue: 'October'},
                        {value: 'November', displayValue: 'November'},
                        {value: 'December', displayValue: 'December'}
                    ]
                },
                value: '',
                valid: false,
                timeElement: true,
                touched: false
            },
            day: {
                elementType: 'timeInput',
                elementConfig: {
                    type: 'text',
                    placeholder: 'Day'
                },
                value: '',
                validation: {
                    required: true,
                    maxLength: 2
                },
                valid: false,
                touched: false,
                timeElement: true,
                touched: false
            },
            year: {
                elementType: 'timeInput',
                elementConfig: {
                    type: 'text',
                    placeholder: 'Year'
                },
                value: '',
                validation: {
                    required: true,
                    exactLength: 4
                },
                valid: false,
                touched: false,
                timeElement: true,
                touched: false
            },
            startHour: {
                elementType: 'select',
                elementConfig: {
                    label: "Enter start time of the event: ",
                    options: [
                        {value: '1', displayValue: '1'}, 
                        {value: '2', displayValue: '2'},
                        {value: '3', displayValue: '3'},
                        {value: '4', displayValue: '4'},
                        {value: '5', displayValue: '5'},
                        {value: '6', displayValue: '6'},
                        {value: '7', displayValue: '7'},
                        {value: '8', displayValue: '8'},
                        {value: '9', displayValue: '9'},
                        {value: '10', displayValue: '10'},
                        {value: '11', displayValue: '11'},
                        {value: '12', displayValue: '12'}
                    ]
                },
                value: '',
                valid: false,
                timeElement: true,
                touched: false
            },
            startMinute: {
                elementType: 'select',
                elementConfig: {
                    options: [
                        {value: '00', displayValue: '00'}, 
                        {value: '05', displayValue: '05'},
                        {value: '10', displayValue: '10'},
                        {value: '15', displayValue: '15'},
                        {value: '20', displayValue: '20'},
                        {value: '25', displayValue: '25'},
                        {value: '30', displayValue: '30'},
                        {value: '35', displayValue: '35'},
                        {value: '40', displayValue: '40'},
                        {value: '45', displayValue: '45'},
                        {value: '50', displayValue: '50'},
                        {value: '55', displayValue: '55'}
                    ]
                },
                value: '',
                valid: false,
                timeElement: true,
                touched: false
            },
            startPeriod: {
                elementType: 'select',
                elementConfig: {
                    options: [
                        {value: 'AM', displayValue: 'AM'}, 
                        {value: 'PM', displayValue: 'PM'}
                    ]
                },
                value: '',
                valid: false,
                timeElement: true,
                touched: false
            },
            endHour: {
                elementType: 'select',
                elementConfig: {
                    label: "Enter end time of the event: ",
                    options: [
                        {value: '1', displayValue: '1'}, 
                        {value: '2', displayValue: '2'},
                        {value: '3', displayValue: '3'},
                        {value: '4', displayValue: '4'},
                        {value: '5', displayValue: '5'},
                        {value: '6', displayValue: '6'},
                        {value: '7', displayValue: '7'},
                        {value: '8', displayValue: '8'},
                        {value: '9', displayValue: '9'},
                        {value: '10', displayValue: '10'},
                        {value: '11', displayValue: '11'},
                        {value: '12', displayValue: '12'}
                    ]
                },
                value: '',
                valid: false,
                timeElement: true,
                touched: false
            },
            endMinute: {
                elementType: 'select',
                elementConfig: {
                    options: [
                        {value: '00', displayValue: '00'}, 
                        {value: '05', displayValue: '05'},
                        {value: '10', displayValue: '10'},
                        {value: '15', displayValue: '15'},
                        {value: '20', displayValue: '20'},
                        {value: '25', displayValue: '25'},
                        {value: '30', displayValue: '30'},
                        {value: '35', displayValue: '35'},
                        {value: '40', displayValue: '40'},
                        {value: '45', displayValue: '45'},
                        {value: '50', displayValue: '50'},
                        {value: '55', displayValue: '55'}
                    ]
                },
                value: '',
                valid: false,
                timeElement: true,
                touched: false
            },
            endPeriod: {
                elementType: 'select',
                elementConfig: {
                    options: [
                        {value: 'AM', displayValue: 'AM'}, 
                        {value: 'PM', displayValue: 'PM'}
                    ]
                },
                value: '',
                valid: false,
                timeElement: true,
                touched: false
            },
            place: {
                elementType: 'input',
                elementConfig: {
                    type: 'text',
                    placeholder: 'Place',
                    label: "Enter the place of your event: "
                },
                value: '',
                validation: {
                    required: true
                },
                valid: false,
                touched: false
            }
        },
        formIsValid: false
    }

    checkValidity(value, rules) {
        let isValid = true;

        if (rules.required) {
            isValid = value.trim() !== '' && isValid;
        }
        if (rules.maxLength) {
            isValid = (value.length > 0) && (value.length <= rules.maxLength) && isValid;
        }
        if (rules.exactLength) {
            isValid = value.length == rules.exactLength && isValid;
        }

        return isValid;
    }

    inputChangedHandler = (event, inputIdentifier) => {
        const updatedEventForm = {
            ...this.state.eventForm
        };

        const updatedFormElement = {
            ...updatedEventForm[inputIdentifier]
        };

        updatedFormElement.value = event.target.value;
        updatedFormElement.valid = this.checkValidity(updatedFormElement.value, updatedFormElement.validation);
        updatedFormElement.touched = true;
        updatedEventForm[inputIdentifier] = updatedFormElement;
        console.log(updatedFormElement);
        this.setState({eventForm: updatedEventForm});
    }

    createEventHandler = (event) => {
        event.preventDefault();

        const formData = {};
        for (let formElementIdentifier in this.state.eventForm) {
            formData[formElementIdentifier] = this.state.eventForm[formElementIdentifier].value;
        }

        // let dateData = firebase.firestore.Timestamp.fromDate(new Date(formData.month + " " + formData.day + ", " + formData.year));
        let dateData = new Date(formData.month + " " + formData.day + ", " + formData.year);
        // console.log("dateData: " + dateData);

        const eventDetails = {
            eventDetails: formData,
            numberOfGuests: 0,
            eventTimestamp: dateData
        }

        axios.post('/events.json', eventDetails)
            .then(response => {
                // console.log(response);
                this.props.history.push('/');
            })
            .catch(error => {
                console.log(error);
            });
    }

    render () {
        const formElementsArray = [];
        for (let key in this.state.eventForm) {
            formElementsArray.push({
                id: key,
                config: this.state.eventForm[key]
            });
        }

        let form = (
            <form onSubmit={this.createEventHandler}>
                {formElementsArray.map(formElement => (
                    <Input 
                        key={formElement.id}
                        elementType={formElement.config.elementType} 
                        elementConfig={formElement.config.elementConfig} 
                        value={formElement.config.value}
                        invalidElement={!formElement.config.valid}
                        timeElement={formElement.config.timeElement}
                        touched={formElement.config.touched}
                        changed={(event) => this.inputChangedHandler(event, formElement.id)} />
                ))}
                <button>CREATE EVENT</button>
            </form>
        );

        return (
            <div className={classes.EventForm}>
                {form}
            </div>
        );
    }
}

export default EventForm;