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
                    placeholder: 'Event Name'
                },
                value: '',
                validation: {
                    required: true
                },
                valid: false,
                touched: false
            },
            month: {
                elementType: 'input',
                elementConfig: {
                    type: 'text',
                    placeholder: 'Month'
                },
                value: '',
                validation: {
                    required: true
                },
                valid: false,
                touched: false
            },
            day: {
                elementType: 'input',
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
                elementType: 'input',
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
                elementType: 'input',
                elementConfig: {
                    type: 'text',
                    placeholder: 'Hour'
                },
                value: '',
                validation: {
                    required: true
                },
                valid: false,
                touched: false
            },
            startMinute: {
                elementType: 'input',
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
                elementType: 'input',
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
                elementType: 'input',
                elementConfig: {
                    type: 'text',
                    placeholder: 'Hour'
                },
                value: '',
                validation: {
                    required: true
                },
                valid: false,
                touched: false
            },
            endMinute: {
                elementType: 'input',
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
                elementType: 'input',
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
                    placeholder: 'Place'
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
        return (
            <div className={classes.EventForm}>
                <Input inputtype="input" type="text" name="eventName" placeholder="Event Name" label="Enter your event name: " />
                <Input inputtype="timeInput" type="text" name="eventMonth" placeholder="Month" label="Enter date of the event: " />
                <Input inputtype="timeInput" type="text" name="eventDay" placeholder="Day" />
                <Input inputtype="timeInput" type="text" name="eventYear" placeholder="Year" />
                <Input inputtype="timeInput" type="text" name="eventStartHour" placeholder="HH" label="Enter start time of the event: " />
                <Input inputtype="timeInput" type="text" name="eventStartMinute" placeholder="MM" />
                <Input inputtype="timeInput" type="text" name="eventStartPeriod" placeholder="AM/PM" />
                <Input inputtype="timeInput" type="text" name="eventEndHour" placeholder="HH" label="Enter end time of the event: " />
                <Input inputtype="timeInput" type="text" name="eventEndMinute" placeholder="MM" />
                <Input inputtype="timeInput" type="text" name="eventEndPeriod" placeholder="AM/PM" />
                <Input inputtype="input" type="text" name="eventPlace" placeholder="Event Place" label="Enter the place of your event: " />
                <button>CREATE EVENT</button>
            </div>
        );
    }
}

export default EventForm;