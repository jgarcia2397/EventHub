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
                elementType: 'timeInput',
                elementConfig: {
                    type: 'text',
                    placeholder: 'Hour',
                    label: "Enter start time of the event: "
                },
                value: '',
                validation: {
                    required: true
                },
                valid: false,
                touched: false
            },
            startMinute: {
                elementType: 'timeInput',
                elementConfig: {
                    type: 'text',
                    placeholder: 'Minute'
                },
                value: '',
                validation: {
                    required: true
                },
                valid: false,
                touched: false
            },
            startPeriod: {
                elementType: 'timeInput',
                elementConfig: {
                    type: 'text',
                    placeholder: 'AM or PM'
                },
                value: '',
                validation: {
                    required: true
                },
                valid: false,
                touched: false
            },
            endHour: {
                elementType: 'timeInput',
                elementConfig: {
                    type: 'text',
                    placeholder: 'Hour',
                    label: "Enter end time of the event: "
                },
                value: '',
                validation: {
                    required: true
                },
                valid: false,
                touched: false
            },
            endMinute: {
                elementType: 'timeInput',
                elementConfig: {
                    type: 'text',
                    placeholder: 'Minute'
                },
                value: '',
                validation: {
                    required: true
                },
                valid: false,
                touched: false
            },
            endPeriod: {
                elementType: 'timeInput',
                elementConfig: {
                    type: 'text',
                    placeholder: 'AM or PM'
                },
                value: '',
                validation: {
                    required: true
                },
                valid: false,
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
                        value={formElement.config.value} />
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