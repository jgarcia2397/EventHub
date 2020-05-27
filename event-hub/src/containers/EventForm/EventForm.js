import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Redirect } from 'react-router-dom';
import moment from 'moment';

import classes from './EventForm.module.css';
import Input from '../../components/UI/Input/Input';
import Spinner from '../../components/UI/Spinner/Spinner';
import errorHandler from '../../hoc/errorHandler/errorHandler';
import axios from '../../axios-events';
import * as actions from '../../store/actions/index';

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
                value: this.props.monthInputVal !== '' ? this.props.monthInputVal : 'January',
                valid: true,
                validation: {
                    isDateTimeDropdown: true
                },
                timeElement: true,
                touched: this.props.monthInputVal !== '' ? true : false
            },
            day: {
                elementType: 'timeInput',
                elementConfig: {
                    type: 'text',
                    placeholder: 'Day'
                },
                value: this.props.dayInputVal !== '' ? this.props.dayInputVal : '',
                validation: {
                    required: true,
                    maxLength: 2,
                    isNumeric: true,
                    isDateTimeInput: true,
                    dayCheck: true
                },
                valid: this.props.dayInputVal !== '' ? true : false,
                touched: this.props.dayInputVal !== '' ? true : false,
                timeElement: true
            },
            year: {
                elementType: 'timeInput',
                elementConfig: {
                    type: 'text',
                    placeholder: 'Year'
                },
                value: this.props.yearInputVal !== '' ? this.props.yearInputVal : '',
                validation: {
                    required: true,
                    exactLength: 4,
                    isNumeric: true,
                    isDateTimeInput: true
                },
                valid: this.props.yearInputVal !== '' ? true : false,
                touched: this.props.yearInputVal !== '' ? true : false,
                timeElement: true
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
                value: '1',
                valid: true,
                validation: {
                    isDateTimeDropdown: true
                },
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
                value: '00',
                valid: true,
                validation: {
                    isDateTimeDropdown: true
                },
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
                value: 'AM',
                valid: true,
                validation: {
                    isDateTimeDropdown: true
                },
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
                value: '1',
                valid: true,
                validation: {
                    isDateTimeDropdown: true
                },
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
                value: '00',
                valid: true,
                validation: {
                    isDateTimeDropdown: true
                },
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
                value: 'AM',
                valid: true,
                validation: {
                    isDateTimeDropdown: true
                },
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
        formIsValid: false,
        dateAndTimeValid: false
    }

    checkTextInputValidity(value, rules) {
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
        if (rules.isNumeric) {
            const pattern = /^\d+$/;
            isValid = pattern.test(value) && isValid;
        }

        return isValid;
    }

    checkDayInputValidity(updatedForm, dayValue, rules) {
        let isValid = true;

        let updatedMonth = updatedForm.month.value;
        let updatedYear = updatedForm.year.value;
        let dateString = updatedMonth + " " + updatedYear;
        let momentObj = moment(dateString, "MMMM Y").daysInMonth();

        if (rules.dayCheck) {
            isValid = dayValue <= momentObj;
        }

        return isValid;
    }

    checkDateAndTimeValidity(updatedForm) {
        let isValid = false;

        let currentDate = moment().format("MMMM D YYYY, h:mm a");
        let startDate = moment(
                            updatedForm.month.value 
                            + " " + updatedForm.day.value 
                            + " " + updatedForm.year.value 
                            + ", " + updatedForm.startHour.value 
                            + ":" + updatedForm.startMinute.value 
                            + " " + updatedForm.startPeriod.value
                        )
                        .format("MMMM D YYYY, h:mm a");
        let endDate = moment(
                            updatedForm.month.value 
                            + " " + updatedForm.day.value 
                            + " " + updatedForm.year.value 
                            + ", " + updatedForm.endHour.value 
                            + ":" + updatedForm.endMinute.value 
                            + " " + updatedForm.endPeriod.value
                        )
                        .format("MMMM D YYYY, h:mm a");

        if (moment(startDate).isBefore(currentDate) || moment(endDate).isBefore(startDate) || startDate === "Invalid date" || endDate === "Invalid date") {
            isValid = false;
        } else {
            isValid = true;
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

        updatedFormElement.touched = true;
        updatedEventForm[inputIdentifier] = updatedFormElement;
        
        let datesAreValid = this.state.dateAndTimeValid;
        if (updatedFormElement.validation.isDateTimeDropdown) {
            datesAreValid = this.checkDateAndTimeValidity(updatedEventForm);
        } else if (updatedFormElement.validation.isDateTimeInput && updatedFormElement.validation.dayCheck) {
            datesAreValid = this.checkDateAndTimeValidity(updatedEventForm);
            updatedFormElement.valid = this.checkTextInputValidity(updatedFormElement.value, updatedFormElement.validation)
                                        && this.checkDayInputValidity(updatedEventForm, updatedFormElement.value, updatedFormElement.validation);
        } else if (updatedFormElement.validation.isDateTimeInput) {
            datesAreValid = this.checkDateAndTimeValidity(updatedEventForm);
            updatedFormElement.valid = this.checkTextInputValidity(updatedFormElement.value, updatedFormElement.validation);
        } else {
            updatedFormElement.valid = this.checkTextInputValidity(updatedFormElement.value, updatedFormElement.validation);
        }

        let formIsValid = true;
        for (let inputIdentifier in updatedEventForm) {
            formIsValid = updatedEventForm[inputIdentifier].valid && formIsValid;
        }
        formIsValid = datesAreValid && formIsValid;

        this.setState({eventForm: updatedEventForm, formIsValid: formIsValid, dateAndTimeValid: datesAreValid});
    }

    createEventHandler = (event) => {
        event.preventDefault();

        if (this.props.isAuthenticated) {
            const formData = {};
            for (let formElementIdentifier in this.state.eventForm) {
                formData[formElementIdentifier] = this.state.eventForm[formElementIdentifier].value;
            }

            let dateData = new Date(formData.month + " " + formData.day + ", " + formData.year);

            const eventDetails = {
                eventDetails: formData,
                eventTimestamp: dateData,
                userId: this.props.userId
            }

            this.props.onCreateEvent(eventDetails, this.props.token, this.props.userId);
        } else {
            this.props.onSetAuthRedirectPath('/createEventForm');
            this.props.history.push('/auth');
        }
    }

    render () {
        const eventCreatedRedirect = this.props.eventCreated ? <Redirect to="/" /> : null;

        const errorMessage = this.props.error ? <p className={classes.ErrorMessage}>{"Event creation error: " + this.props.error.message + ". Please try again."}</p> : null;

        const formElementsArray = [];
        for (let key in this.state.eventForm) {
            formElementsArray.push({
                id: key,
                config: this.state.eventForm[key]
            });
        }

        let invalidDateTimeMsg = null;
        let dateTimeValidity = this.state.dateAndTimeValid;
        if (!dateTimeValidity) {
            invalidDateTimeMsg = <p><strong>Invalid date or start/end time.</strong></p>
        }
        let form = null;
        form = <Spinner />;
        if(!this.props.loading) {
            form = (
                <form onSubmit={this.createEventHandler}>
                    {formElementsArray.map(formElement => (
                        <Input 
                            key={formElement.id}
                            elementType={formElement.config.elementType} 
                            elementConfig={formElement.config.elementConfig} 
                            value={formElement.config.value}
                            invalidElement={!formElement.config.valid}
                            invalidDateTime={!this.state.dateAndTimeValid}
                            timeElement={formElement.config.timeElement}
                            touched={formElement.config.touched}
                            changed={(event) => this.inputChangedHandler(event, formElement.id)} />
                    ))}
                    {invalidDateTimeMsg}
                    <button disabled={!this.state.formIsValid}>{this.props.isAuthenticated ? 'CREATE EVENT' : 'LOGIN TO CREATE EVENT'}</button>
                </form>
            );
        }

        return (
            <div className={classes.EventForm}>
                {eventCreatedRedirect}
                {errorMessage}
                {form}
            </div>
        );
    }
}

const mapStateToProps = state => {
    return {
        loading: state.eventForm.loading,      
        eventCreated: state.eventForm.eventCreated,
        token: state.auth.token,
        userId: state.auth.userId,
        isAuthenticated: state.auth.token !== null,
        monthInputVal: state.eventForm.initialMonthVal,
        dayInputVal: state.eventForm.initialDayVal,
        yearInputVal: state.eventForm.initialYearVal,
        error: state.eventForm.error
    };
}

const mapDispatchToProps = dispatch => {
    return {
        onCreateEvent: (eventDetails, token, userId) => dispatch(actions.createEvent(eventDetails, token, userId)),
        onSetAuthRedirectPath: (path) => dispatch(actions.setAuthRedirectPath(path))
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(errorHandler(EventForm, axios));