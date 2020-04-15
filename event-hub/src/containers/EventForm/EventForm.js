import React, { Component } from 'react';

import classes from './EventForm.module.css';
import Input from '../../components/UI/Input/Input';

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
                elementType: 'timeInput',
                elementConfig: {
                    type: 'text',
                    placeholder: 'Month',
                    label: "Enter date of the event: "
                },
                value: '',
                validation: {
                    required: true
                },
                valid: false,
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
                    required: true
                },
                valid: false,
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
                    required: true
                },
                valid: false,
                touched: false
            },
            startHour: {
                elementType: 'select',
                elementConfig: {
                    label: "Enter start time of the event: ",
                    options: [
                        {value: 'oneStartHour', displayValue: '1'}, 
                        {value: 'twoStartHour', displayValue: '2'},
                        {value: 'threeStartHour', displayValue: '3'},
                        {value: 'fourStartHour', displayValue: '4'},
                        {value: 'fiveStartHour', displayValue: '5'},
                        {value: 'sixStartHour', displayValue: '6'},
                        {value: 'sevenStartHour', displayValue: '7'},
                        {value: 'eightStartHour', displayValue: '8'},
                        {value: 'nineStartHour', displayValue: '9'},
                        {value: 'tenStartHour', displayValue: '10'},
                        {value: 'elevenStartHour', displayValue: '11'},
                        {value: 'twelveStartHour', displayValue: '12'}
                    ]
                },
                value: '',
                validation: {
                    required: true
                },
                valid: false
            },
            startMinute: {
                elementType: 'select',
                elementConfig: {
                    options: [
                        {value: 'zeroStartMin', displayValue: '00'}, 
                        {value: 'fiveStartMin', displayValue: '05'},
                        {value: 'tenStartMin', displayValue: '10'},
                        {value: 'fifteenStartMin', displayValue: '15'},
                        {value: 'twentyStartMin', displayValue: '20'},
                        {value: 'twentyfiveStartMin', displayValue: '25'},
                        {value: 'thirtyStartMin', displayValue: '30'},
                        {value: 'thirtyfiveStartMin', displayValue: '35'},
                        {value: 'fortyStartMin', displayValue: '40'},
                        {value: 'fortyfiveStartMin', displayValue: '45'},
                        {value: 'fiftyStartMin', displayValue: '50'},
                        {value: 'fiftyfiveStartMin', displayValue: '55'}
                    ]
                },
                value: '',
                validation: {
                    required: true
                },
                valid: false
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
                validation: {
                    required: true
                },
                valid: false
            },
            endHour: {
                elementType: 'select',
                elementConfig: {
                    label: "Enter end time of the event: ",
                    options: [
                        {value: 'oneEndtHour', displayValue: '1'}, 
                        {value: 'twoEndHour', displayValue: '2'},
                        {value: 'threeEndHour', displayValue: '3'},
                        {value: 'fourEndHour', displayValue: '4'},
                        {value: 'fiveEndHour', displayValue: '5'},
                        {value: 'sixEndHour', displayValue: '6'},
                        {value: 'sevenEndHour', displayValue: '7'},
                        {value: 'eightEndHour', displayValue: '8'},
                        {value: 'nineEndHour', displayValue: '9'},
                        {value: 'tenEndHour', displayValue: '10'},
                        {value: 'elevenEndHour', displayValue: '11'},
                        {value: 'twelveEndHour', displayValue: '12'}
                    ]
                },
                value: '',
                validation: {
                    required: true
                },
                valid: false
            },
            endMinute: {
                elementType: 'select',
                elementConfig: {
                    options: [
                        {value: 'zeroEndMin', displayValue: '00'}, 
                        {value: 'fiveEndMin', displayValue: '05'},
                        {value: 'tenEndMin', displayValue: '10'},
                        {value: 'fifteenEndMin', displayValue: '15'},
                        {value: 'twentyEndMin', displayValue: '20'},
                        {value: 'twentyfiveEndMin', displayValue: '25'},
                        {value: 'thirtyEndMin', displayValue: '30'},
                        {value: 'thirtyfiveEndMin', displayValue: '35'},
                        {value: 'fortyEndMin', displayValue: '40'},
                        {value: 'fortyfiveEndMin', displayValue: '45'},
                        {value: 'fiftyEndMin', displayValue: '50'},
                        {value: 'fiftyfiveEndMin', displayValue: '55'}
                    ]
                },
                value: '',
                validation: {
                    required: true
                },
                valid: false
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
                validation: {
                    required: true
                },
                valid: false
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

    inputChangedHandler = (event, inputIdentifier) => {
        const updatedEventForm = {
            ...this.state.eventForm
        };

        const updatedFormElement = {
            ...updatedEventForm[inputIdentifier]
        };

        updatedFormElement.value = event.target.value;
        updatedEventForm[inputIdentifier] = updatedFormElement;
        this.setState({eventForm: updatedEventForm});
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
            <form>
                {formElementsArray.map(formElement => (
                    <Input 
                        key={formElement.id}
                        elementType={formElement.config.elementType} 
                        elementConfig={formElement.config.elementConfig} 
                        value={formElement.config.value}
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