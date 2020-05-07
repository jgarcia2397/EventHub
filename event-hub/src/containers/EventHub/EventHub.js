import React, { Component } from 'react';
import moment from 'moment';
import axios from '../../axios-events';
import { connect } from 'react-redux';

import * as actions from '../../store/actions/index';
import classes from './EventHub.module.css';
import Auxiliary from '../../hoc/Auxiliary/Auxiliary';
import Selector from '../../components/Selector/Selector';
import DateHeader from '../../components/DateHeader/DateHeader';
import DateButton from '../../components/DateButton/DateButton';
import CalendarTable from '../../components/CalendarTable/CalendarTable';
import EventList from '../../components/EventList/EventList';
import Modal from '../../components/UI/Modal/Modal';
import EventPopup from '../../components/EventPopup/EventPopup';

class EventHub extends Component {
    state = {
        selectedDay: 0,
        isDaySelected: false,
        events: [],
        deletingEvent: false,
        eventIdToBeDeleted: null
    };

    componentDidMount() {
        const token = localStorage.getItem('token');
        const userId = localStorage.getItem('userId');
        if (this.props.token === null) {
            this.props.onInitEventList(token, userId);
        } else {
            this.props.onInitEventList(this.props.token, this.props.userId);
        }
    }

    componentDidUpdate(prevProps) {
        if (this.props.events.length !== prevProps.events.length) {
            const token = localStorage.getItem('token');
            const userId = localStorage.getItem('userId');
            if (this.props.token === null) {
                this.props.onInitEventList(token, userId);
            } else {
                this.props.onInitEventList(this.props.token, this.props.userId);
            }
        }
    }

    getDays = () => {
        // return this.state.dateObject.daysInMonth();
        return this.props.date.daysInMonth();
    }

    getCurrentDay = () => {
        // return this.state.dateObject.format("D");
        return this.props.date.format("D");
    }

    getMonth = () => {
        // return this.state.dateObject.format("MMMM");
        return this.props.date.format("MMMM");
    }

    getYear = () => {
        // return this.state.dateObject.format("Y");
        return this.props.date.format("Y");
    }

    getFirstDayOfMonth = () => {
        // let dateObject = this.state.dateObject;
        let dateObject = this.props.date;
        let firstDay = moment(dateObject).startOf("month").format("d");

        return firstDay;
    }

    getBlanksPriorToFirstDay = () => {
        let blanks = [];
        for (let i = 0; i < this.getFirstDayOfMonth(); i++) {
            blanks.push(
                <td key={i*100} className={classes.EmptySlot}>
                    {""}
                </td>
            );
        }
        // console.log("Blanks: ", blanks);
        return blanks;
    }

    getDaysOfMonth = () => {
        let days = [];
        let eventDates = [];

        for (let i = 0; i < this.props.events.length; i++) {
            let date = this.props.events[i].eventDetails.month + " " + this.props.events[i].eventDetails.day + ", " + this.props.events[i].eventDetails.year;
            eventDates.push(date);
        }

        // current date
        const currMonth = moment().format("MMMM");
        const currYear = moment().format("YYYY");

        // selected calendar date, dateObject in state updated everytime new date selected
        // const dateObjectMonth = this.state.dateObject.format("MMMM");
        // const dateObjectYear = this.state.dateObject.format("YYYY");
        const dateObjectMonth = this.props.date.format("MMMM");
        const dateObjectYear = this.props.date.format("YYYY");

        for (let d = 1; d <= this.getDays(); d++) {
            let day = "";
            var compareDate = dateObjectMonth + " " + d + ", " + dateObjectYear;

            if ((eventDates.indexOf(compareDate) > -1) && (d == this.getCurrentDay() && currMonth === dateObjectMonth && currYear === dateObjectYear)) {
                day = classes.EventCurrentDay;
            } else if (d == this.getCurrentDay() && currMonth === dateObjectMonth && currYear === dateObjectYear) {
                day = classes.CurrentDay;
            } else if (eventDates.indexOf(compareDate) > -1) {
                day = classes.EventDay;
            } else {
                day = classes.Day;
            }

            days.push(
                <td 
                    key={d} 
                    className={day}
                    onClick={() => {this.onDayClick(d)}}
                >
                    {d}
                </td>
            );
        }
        return days;
    }

    onDayClick = (d) => {
        this.setState({
            selectedDay: d,
            isDaySelected: true
        },
        () => {
            console.log("SELECTED DAY: ", this.state.selectedDay);
        });
    }

    createCalendar = () => {
        let newBlanks = this.getBlanksPriorToFirstDay();
        let newDays = this.getDaysOfMonth();
        
        var totalSlots = [...newBlanks, ...newDays];
        let rows = [];
        let cells = [];

        totalSlots.forEach((dayValue, i) => {
            if (i % 7 !== 0) {
                cells.push(dayValue);
            } else {
                rows.push(cells);
                cells = [];
                cells.push(dayValue);
            }
            if (i === totalSlots.length - 1) {
                rows.push(cells);
            }
        });

        let calendarDays = rows.map((d, i) => {
            return <tr key={i}>{d}</tr>
        });
        return calendarDays;
    }

    getYearRange(startYear, stopYear) {
        var yearArray = [];
        // console.log("[getYearRange] startYear: ", startYear);
        // console.log("[getYearRange] stopYear: ", stopYear);
        var currentYear = moment(startYear, "YYYY");
        var endYear = moment(stopYear, "YYYY");
        // console.log("[getYearRange] currentYear: ", currentYear);
        // console.log("[getYearRange] endYear: ", endYear);
        while (currentYear <= endYear) {
            yearArray.push(moment(currentYear).format("YYYY"));
            currentYear = moment(currentYear).add(1, "year");
            // console.log("[getYearRange] currentYear + 1: ", currentYear);
        }
        return yearArray;
    }

    onCreateEventContinue = () => {
        this.props.onInitCreateEvent();
        this.props.history.push('/createEventForm');
    }

    onCreateEventCancel = () => {
        this.setState({
            isDaySelected: false,
            deletingEvent: false
        });
    }

    onDeleteEventClick = (eventId) => {
        this.setState({eventIdToBeDeleted: eventId, deletingEvent: true});
    }

    onDeleteEventConfirm = (eventId) => {
        this.props.onDeleteEvent(eventId);
        this.setState({deletingEvent: false});
    }

    render () {
        let calendar = null;
        calendar = (
            <div className={classes.CalendarContainer}>
                <table className={classes.Calendar}>
                    <thead className={classes.CalendarHeader}>
                        <tr>
                            <DateButton
                                // prevClick={this.onPrev}
                                // nextClick={this.onNext}
                                prevClick={this.props.onDatePrevClick}
                                nextClick={this.props.onDateNextClick}
                                type="prev" />
                            <DateHeader
                                // toggleMonthSel={this.toggleMonthSelector}
                                // toggleYearSel={this.toggleYearSelector}
                                toggleMonthSel={this.props.onToggleMonthSel}
                                toggleYearSel={this.props.onToggleYearSel}
                                month={this.getMonth()}
                                year={this.getYear()} />
                            <DateButton
                                // prevClick={this.onPrev}
                                // nextClick={this.onNext}
                                prevClick={this.props.onDatePrevClick}
                                nextClick={this.props.onDateNextClick}
                                type="next" />
                        </tr>
                        <tr>
                            <td colSpan="7">
                                <table>
                                    <Selector 
                                        // showMonthSelector={this.state.showMonthSelector}
                                        showMonthSelector={this.props.showMonthSel}
                                        // showYearSelector={this.state.showYearSelector}
                                        showYearSelector={this.props.showYearSel}
                                        // listOfMonths={this.state.monthList}
                                        listOfMonths={this.props.months}
                                        // selectedMonth={this.selectMonth}
                                        selectedMonth={this.props.onMonthSelected}
                                        currentYear={this.getYear()}
                                        yearRange={this.getYearRange}
                                        // selectedYear={this.selectYear}
                                        selectedYear={this.props.onYearSelected} />
                                </table>
                            </td>
                        </tr>
                    </thead>
                    <CalendarTable
                        // showMonthSel={this.state.showMonthSelector}
                        // showYearSel={this.state.showYearSelector}
                        showMonthSel={this.props.showMonthSel}
                        showYearSel={this.props.showYearSel}
                        calendar={this.createCalendar} />
                </table>
            </div>    
        );

        let eventPopup = null;
        eventPopup = <EventPopup
                        isDeleting={this.state.deletingEvent}
                        // month={this.state.dateObject.format("MMMM")}
                        month={this.props.date.format("MMMM")}
                        day={this.state.selectedDay}
                        // year={this.state.dateObject.format("YYYY")}
                        year={this.props.date.format("YYYY")}
                        onContinue={this.onCreateEventContinue}
                        onCancel={this.onCreateEventCancel}
                        onDelete={this.onDeleteEventConfirm}
                        deleteId={this.state.eventIdToBeDeleted} />

        return (
            <Auxiliary>
                <Modal 
                    show={this.state.isDaySelected || this.state.deletingEvent}
                    close={this.onCreateEventCancel}>
                        {eventPopup}
                </Modal>
                {calendar}
                <h1>Your Events</h1>
                <EventList 
                    eventList={this.props.events}
                    onDelete={this.onDeleteEventClick} />
            </Auxiliary>
        );
    }
}

const mapStateToProps = state => {
    return {
        date: state.eventHub.dateObject,
        months: state.eventHub.monthList,
        showMonthSel: state.eventHub.showMonthSelector,
        showYearSel: state.eventHub.showYearSelector,
        events: state.eventHub.events,
        error: state.eventHub.error,
        token: state.auth.token,
        userId: state.auth.userId
    };
}

const mapDispatchToProps = dispatch => {
    return {
        onMonthSelected: (newMonth) => dispatch(actions.selectMonth(newMonth)),
        onYearSelected: (newYear) => dispatch(actions.selectYear(newYear)),
        onToggleMonthSel: () => dispatch(actions.toggleMonthSelector()),
        onToggleYearSel: () => dispatch(actions.toggleYearSelector()),
        onDatePrevClick: () => dispatch(actions.onPrevCalendarClick()),
        onDateNextClick: () => dispatch(actions.onNextCalendarClick()),
        onInitEventList: (token, userId) => dispatch(actions.initEventList(token, userId)),
        onInitCreateEvent: () => dispatch(actions.createEventInit()),
        onDeleteEvent: (eventId) => dispatch(actions.deleteEvent(eventId))
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(EventHub);