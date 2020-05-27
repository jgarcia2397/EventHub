import React, { Component } from 'react';
import moment from 'moment';
import { connect } from 'react-redux';

import * as actions from '../../store/actions/index';
import axios from '../../axios-events';
import classes from './EventHub.module.css';
import Auxiliary from '../../hoc/Auxiliary/Auxiliary';
import Selector from '../../components/Selector/Selector';
import DateHeader from '../../components/DateHeader/DateHeader';
import DateButton from '../../components/DateButton/DateButton';
import CalendarTable from '../../components/CalendarTable/CalendarTable';
import EventList from '../../components/EventList/EventList';
import Modal from '../../components/UI/Modal/Modal';
import EventPopup from '../../components/EventPopup/EventPopup';
import Spinner from '../../components/UI/Spinner/Spinner';
import errorHandler from '../../hoc/errorHandler/errorHandler';

class EventHub extends Component {
    state = {
        selectedDay: 0,
        isDaySelected: false,
        deletingEvent: false,
        eventIdToBeDeleted: null
    };

    componentDidMount() {
        const token = localStorage.getItem('token');
        const userId = localStorage.getItem('userId');

        if ((this.props.token === null && this.props.userId === null) || (token === null && userId === null)) {
            this.props.onSetEmptyEventLists();
        } else if (this.props.token === null && (token !== null && userId !== null)) {
            this.props.onInitEventList(token, userId);
            this.props.onInitGuestEventList(token, userId);
        } else if (this.props.token !== null && this.props.userId !== null) {
            this.props.onInitEventList(this.props.token, this.props.userId);
            this.props.onInitGuestEventList(this.props.token, this.props.userId);
        }
    }

    componentDidUpdate(prevProps) {
        if (this.props.events.length !== prevProps.events.length) {
            const token = localStorage.getItem('token');
            const userId = localStorage.getItem('userId');
            if ((this.props.token === null && this.props.userId === null) || (token === null && userId === null)) {
                this.props.onSetEmptyEventLists();
            } else if (this.props.token === null && (token !== null && userId !== null)) {
                this.props.onInitEventList(token, userId);
                this.props.onInitGuestEventList(token, userId);
            } else if (this.props.token !== null && this.props.userId !== null) {
                this.props.onInitEventList(this.props.token, this.props.userId);
                this.props.onInitGuestEventList(this.props.token, this.props.userId);
            }
        }
    }

    getDays = () => {
        return this.props.date.daysInMonth();
    }

    getCurrentDay = () => {
        return this.props.date.format("D");
    }

    getMonth = () => {
        return this.props.date.format("MMMM");
    }

    getYear = () => {
        return this.props.date.format("Y");
    }

    getFirstDayOfMonth = () => {
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
        return blanks;
    }

    getDaysOfMonth = () => {
        let days = [];
        let eventDates = [];
        let guestEventDates = [];

        for (let i = 0; i < this.props.events.length; i++) {
            let date = this.props.events[i].eventDetails.month + " " + this.props.events[i].eventDetails.day + ", " + this.props.events[i].eventDetails.year;
            eventDates.push(date);
        }

        for (let j = 0; j < this.props.guestEvents.length; j++) {
            let date = this.props.guestEvents[j].eventDetails.month + " " + this.props.guestEvents[j].eventDetails.day + ", " + this.props.guestEvents[j].eventDetails.year;
            guestEventDates.push(date);
        }

        // current date
        const currMonth = moment().format("MMMM");
        const currYear = moment().format("YYYY");

        // selected calendar date, dateObject in state updated everytime new date selected
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
            } else if (guestEventDates.indexOf(compareDate) > -1) {
                day = classes.GuestEventDay;
            } else {
                day = classes.Day;
            }

            days.push(
                <td 
                    key={d} 
                    className={day}
                    onClick={() => {this.onDayClick(d)}}
                >{d}
                </td>
            );
        }
        return days;
    }

    onDayClick = (d) => {
        this.setState({
            selectedDay: d,
            isDaySelected: true
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
        var currentYear = moment(startYear, "YYYY");
        var endYear = moment(stopYear, "YYYY");
        while (currentYear <= endYear) {
            yearArray.push(moment(currentYear).format("YYYY"));
            currentYear = moment(currentYear).add(1, "year");
        }
        return yearArray;
    }

    onCreateEventContinue = () => {
        let monthVal = this.props.date.format("MMMM");
        let dayVal = this.state.selectedDay;
        let yearVal = this.props.date.format("YYYY");

        this.props.onInitCreateEvent(monthVal, dayVal, yearVal);
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

    onCheckGuestsOrChatClick = (eventId, eventName, eventDate, eventCreator) => {
        this.props.onCheckGuestsChat(eventId, eventName, eventDate, eventCreator);
        this.props.history.push('/chats');
    }

    onDeleteEventConfirm = (eventId) => {
        this.props.onDeleteEvent(eventId, this.props.token);
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
                                prevClick={this.props.onDatePrevClick}
                                nextClick={this.props.onDateNextClick}
                                type="prev" />
                            <DateHeader
                                toggleMonthSel={this.props.onToggleMonthSel}
                                toggleYearSel={this.props.onToggleYearSel}
                                month={this.getMonth()}
                                year={this.getYear()} />
                            <DateButton
                                prevClick={this.props.onDatePrevClick}
                                nextClick={this.props.onDateNextClick}
                                type="next" />
                        </tr>
                        <tr>
                            <td colSpan="7">
                                <table>
                                    <Selector 
                                        showMonthSelector={this.props.showMonthSel}
                                        showYearSelector={this.props.showYearSel}
                                        listOfMonths={this.props.months}
                                        selectedMonth={this.props.onMonthSelected}
                                        currentYear={this.getYear()}
                                        yearRange={this.getYearRange}
                                        selectedYear={this.props.onYearSelected} />
                                </table>
                            </td>
                        </tr>
                    </thead>
                    <CalendarTable
                        showMonthSel={this.props.showMonthSel}
                        showYearSel={this.props.showYearSel}
                        calendar={this.createCalendar} />
                </table>
            </div>    
        );

        let eventPopup = null;
        eventPopup = <EventPopup
                        isDeleting={this.state.deletingEvent}
                        month={this.props.date.format("MMMM")}
                        day={this.state.selectedDay}
                        year={this.props.date.format("YYYY")}
                        onContinue={this.onCreateEventContinue}
                        onCancel={this.onCreateEventCancel}
                        onDelete={this.onDeleteEventConfirm}
                        deleteId={this.state.eventIdToBeDeleted} />

        let eventList = null;
        if (this.props.eventListLoading || this.props.deleteLoading) {
            eventList = <Spinner />
        } else {
            eventList = <EventList 
                    eventList={this.props.events}
                    onDelete={this.onDeleteEventClick}
                    onCheckGuestsOrChat={this.onCheckGuestsOrChatClick}
                    deleteError={this.props.error}
                    deleteFailId={this.props.deleteFailEventId} />;
        }

        let guestEventList = null;
        if (this.props.guestEventListLoading) {
            guestEventList = <Spinner />
        } else {
            guestEventList = <EventList 
                isGuestList
                eventList={this.props.guestEvents}
                onDelete={this.onDeleteEventClick}
                onCheckGuestsOrChat={this.onCheckGuestsOrChatClick} />;
        }

        return (
            <Auxiliary>
                <Modal 
                    show={this.state.isDaySelected || this.state.deletingEvent}
                    close={this.onCreateEventCancel}>
                        {eventPopup}
                </Modal>
                {calendar}
                <div className={classes.Events}>
                    <div className={classes.YourEvents}>
                        <h1>Your Events</h1>
                        {eventList}
                    </div>
                    <div className={classes.InvitedTo}>
                        <h1>Invited To</h1>
                        {guestEventList}
                    </div>
                </div>
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
        guestEvents: state.eventHub.guestEvents,
        error: state.eventHub.error,
        token: state.auth.token,
        userId: state.auth.userId,
        eventListLoading: state.eventHub.eventListLoading,
        guestEventListLoading: state.eventHub.guestEventListLoading,
        deleteLoading: state.eventHub.deleteLoading,
        deleteFailEventId: state.eventHub.deleteFailEventId
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
        onInitCreateEvent: (month, day, year) => dispatch(actions.createEventInit(month, day, year)),
        onDeleteEvent: (eventId, token) => dispatch(actions.deleteEvent(eventId, token)),
        onCheckGuestsChat: (eventId, eventName, eventDate, eventCreator) => dispatch(actions.setChatEventId(eventId, eventName, eventDate, eventCreator)),
        onInitGuestEventList: (token, userId) => dispatch(actions.initGuestEventList(token, userId)),
        onSetEmptyEventLists: () => dispatch(actions.setEmptyEventLists())
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(errorHandler(EventHub, axios));