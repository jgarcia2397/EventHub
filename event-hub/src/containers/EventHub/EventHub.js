import React, { Component } from 'react';
import moment from 'moment';
import axios from '../../axios-events';

import classes from './EventHub.module.css';
import Auxiliary from '../../hoc/Auxiliary/Auxiliary';
import Selector from '../../components/Selector/Selector';
import DateHeader from '../../components/DateHeader/DateHeader';
import DateButton from '../../components/DateButton/DateButton';
import CalendarTable from '../../components/CalendarTable/CalendarTable';
import EventList from '../../components/EventList/EventList';
import Modal from '../../components/UI/Modal/Modal';
import CreateEventPopup from '../../components/CreateEventPopup/CreateEventPopup';

class EventHub extends Component {
    state = {
        dateObject: moment(),
        monthList: moment.months(),
        showMonthSelector: false,
        showYearSelector: false,
        selectedDay: 0,
        isDaySelected: false,
        eventList: []
    };

    componentDidMount() {
        axios.get('./events.json?orderBy="eventTimestamp"')
            .then(res => {
                const fetchedEventList = [];
                for (let key in res.data) {
                    fetchedEventList.push({
                        ...res.data[key],
                        id: key
                    });
                }
                fetchedEventList.sort((a, b) => {
                    if (moment(b.eventTimestamp).isBefore(a.eventTimestamp)){
                        return 1;
                    } else if (moment(a.eventTimestamp).isBefore(b.eventTimestamp)){
                        return -1;
                    } else {
                        return 0;
                    }
                });
                this.setState({eventList: fetchedEventList});
            })
            .catch(err => {
                console.log(err);
            });
    }

    getDays = () => {
        return this.state.dateObject.daysInMonth();
    }

    getCurrentDay = () => {
        return this.state.dateObject.format("D");
    }

    getMonth = () => {
        return this.state.dateObject.format("MMMM");
    }

    getYear = () => {
        return this.state.dateObject.format("Y");
    }

    getFirstDayOfMonth = () => {
        let dateObject = this.state.dateObject;
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

        // current date
        const currMonth = moment().format("MMMM");
        const currYear = moment().format("YYYY");

        // selected calendar date, dateObject in state updated everytime new date selected
        const dateObjectMonth = this.state.dateObject.format("MMMM");
        const dateObjectYear = this.state.dateObject.format("YYYY");

        // console.log("currMonth: " + currMonth + ", currYear: " + currYear);
        // console.log("dateObjectMonth: " + dateObjectMonth + ", dateObjectYear: " + dateObjectYear);

        for (let d = 1; d <= this.getDays(); d++) {
            let currentDay = (d == this.getCurrentDay() && currMonth === dateObjectMonth && currYear === dateObjectYear) ? classes.CurrentDay : classes.Day;
            days.push(
                <td 
                    key={d} 
                    className={currentDay}
                    onClick={() => {this.onDayClick(d)}}
                >
                    {d}
                </td>
            );
        }
        // console.log("Days: ", days);
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

    selectMonth = (month) => {
        let monthNo = this.state.monthList.indexOf(month); 
        let dateObject = Object.assign({}, this.state.dateObject);
        dateObject = moment(dateObject).set("month", monthNo); 
        this.setState({
            dateObject: dateObject,
            showMonthSelector: !this.state.showMonthSelector 
        });
    }

    selectYear = (year) => {
        // console.log("[selectYear] year: " + year);
        let dateObject = Object.assign({}, this.state.dateObject);
        dateObject = moment(dateObject).set("year", year); 
        this.setState({
            dateObject: dateObject,
            showYearSelector: !this.state.showYearSelector 
        });
    }

    toggleMonthSelector = () => {
        this.setState({
            showMonthSelector: !this.state.showMonthSelector
        });
    }

    toggleYearSelector = () => {
        this.setState({
            showYearSelector: !this.state.showYearSelector
        });
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

    onPrev = () => {
        let curr = "";
        if (this.state.showYearSelector) {
            curr = "year";
        } else {
            curr = "month";
        }
        this.setState({
            dateObject: this.state.dateObject.subtract(1, curr)
        });
    };

    onNext = () => {
        let curr = "";
        if (this.state.showYearSelector) {
            curr = "year";
        } else {
            curr = "month";
        }
        this.setState({
            dateObject: this.state.dateObject.add(1, curr)
        });
    };

    onCreateEventContinue = () => {
        this.props.history.push('/createEventForm');
    }

    onCreateEventCancel = () => {
        this.setState({
            isDaySelected: false
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
                                prevClick={this.onPrev}
                                nextClick={this.onNext}
                                type="prev" />
                            <DateHeader
                                toggleMonthSel={this.toggleMonthSelector}
                                toggleYearSel={this.toggleYearSelector}
                                month={this.getMonth()}
                                year={this.getYear()} />
                            <DateButton
                                prevClick={this.onPrev}
                                nextClick={this.onNext}
                                type="next" />
                        </tr>
                        <tr>
                            <td colSpan="7">
                                <table>
                                    <Selector 
                                        showMonthSelector={this.state.showMonthSelector}
                                        showYearSelector={this.state.showYearSelector}
                                        listOfMonths={this.state.monthList}
                                        selectedMonth={this.selectMonth}
                                        currentYear={this.getYear()}
                                        yearRange={this.getYearRange}
                                        selectedYear={this.selectYear} />
                                </table>
                            </td>
                        </tr>
                    </thead>
                    <CalendarTable
                        showMonthSel={this.state.showMonthSelector}
                        showYearSel={this.state.showYearSelector}
                        calendar={this.createCalendar} />
                </table>
            </div>    
        );

        let createEventPopup = null;
        createEventPopup = <CreateEventPopup
                                month={this.state.dateObject.format("MMMM")}
                                day={this.state.selectedDay}
                                year={this.state.dateObject.format("YYYY")}
                                onContinue={this.onCreateEventContinue}
                                onCancel={this.onCreateEventCancel} />

        return (
            <Auxiliary>
                <Modal 
                    show={this.state.isDaySelected}
                    close={this.onCreateEventCancel}>
                        {createEventPopup}
                </Modal>
                {calendar}
                <h1>Your Events</h1>
                <EventList eventList={this.state.eventList} />
            </Auxiliary>
        );
    }
}

export default EventHub;