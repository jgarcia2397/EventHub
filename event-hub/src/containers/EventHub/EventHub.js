import React, { Component } from 'react';
import moment from 'moment';
import axios from '../../axios-events';
import { connect } from 'react-redux';

import * as actionTypes from '../../store/actions/actionTypes';
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
        // dateObject: moment(),
        // monthList: moment.months(),
        // showMonthSelector: false,
        // showYearSelector: false,
        selectedDay: 0,
        isDaySelected: false,
        events: [],
        deletingEvent: false,
        eventIdToBeDeleted: null
    };

    componentDidMount() {
        this.getEventsFromBackend();
    }

    getEventsFromBackend = () => {
        axios.get('/events.json?orderBy="eventTimestamp"')
            .then(res => {
                const fetchedEvents = [];
                for (let key in res.data) {
                    fetchedEvents.push({
                        ...res.data[key],
                        id: key
                    });
                }
                fetchedEvents.sort((a, b) => {
                    if (moment(b.eventTimestamp).isBefore(a.eventTimestamp)){
                        return 1;
                    } else if (moment(a.eventTimestamp).isBefore(b.eventTimestamp)){
                        return -1;
                    } else {
                        return 0;
                    }
                });
                this.setState({events: fetchedEvents});
            })
            .catch(err => {
                console.log(err);
            });
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

        for (let i = 0; i < this.state.events.length; i++) {
            let date = this.state.events[i].eventDetails.month + " " + this.state.events[i].eventDetails.day + ", " + this.state.events[i].eventDetails.year;
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

    // selectMonth = (month) => {
    //     let monthNo = this.state.monthList.indexOf(month); 
    //     let dateObject = Object.assign({}, this.state.dateObject);
    //     dateObject = moment(dateObject).set("month", monthNo); 
    //     this.setState({
    //         dateObject: dateObject,
    //         showMonthSelector: !this.state.showMonthSelector 
    //     });
    // }

    // selectYear = (year) => {
    //     // console.log("[selectYear] year: " + year);
    //     let dateObject = Object.assign({}, this.state.dateObject);
    //     dateObject = moment(dateObject).set("year", year); 
    //     this.setState({
    //         dateObject: dateObject,
    //         showYearSelector: !this.state.showYearSelector 
    //     });
    // }

    // toggleMonthSelector = () => {
    //     this.setState({
    //         showMonthSelector: !this.state.showMonthSelector
    //     });
    // }

    // toggleYearSelector = () => {
    //     this.setState({
    //         showYearSelector: !this.state.showYearSelector
    //     });
    // }

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

    // onPrev = () => {
    //     let curr = "";
    //     if (this.state.showYearSelector) {
    //         curr = "year";
    //     } else {
    //         curr = "month";
    //     }
    //     this.setState({
    //         dateObject: this.state.dateObject.subtract(1, curr)
    //     });
    // };

    // onNext = () => {
    //     let curr = "";
    //     if (this.state.showYearSelector) {
    //         curr = "year";
    //     } else {
    //         curr = "month";
    //     }
    //     this.setState({
    //         dateObject: this.state.dateObject.add(1, curr)
    //     });
    // };

    onCreateEventContinue = () => {
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
        axios.delete('/events/' + eventId + '.json')
            .then(res => {
                // console.log(res);
                this.getEventsFromBackend();
                this.setState({deletingEvent: false});
            })
            .catch(err => {
                console.log(err);
            });
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
                    eventList={this.state.events}
                    onDelete={this.onDeleteEventClick} />
            </Auxiliary>
        );
    }
}

const mapStateToProps = state => {
    return {
        date: state.dateObject,
        months: state.monthList,
        showMonthSel: state.showMonthSelector,
        showYearSel: state.showYearSelector
    };
}

const mapDispatchToProps = dispatch => {
    return {
        onMonthSelected: (newMonth) => dispatch({type: actionTypes.SELECT_MONTH, monthName: newMonth}),
        onYearSelected: (newYear) => dispatch({type: actionTypes.SELECT_YEAR, year: newYear}),
        onToggleMonthSel: () => dispatch({type: actionTypes.TOGGLE_MONTH_SELECTOR}),
        onToggleYearSel: () => dispatch({type: actionTypes.TOGGLE_YEAR_SELECTOR}),
        onDatePrevClick: () => dispatch({type: actionTypes.ON_PREV_CALENDAR_CLICK}),
        onDateNextClick: () => dispatch({type: actionTypes.ON_NEXT_CALENDAR_CLICK})
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(EventHub);