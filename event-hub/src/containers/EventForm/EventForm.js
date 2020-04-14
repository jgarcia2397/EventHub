import React, { Component } from 'react';

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
            <div>
                <h1>EventForm</h1>
            </div>
        );
    }
}

export default EventForm;