import React, { Component } from 'react';
import moment from 'moment';

import classes from './EventHub.module.css';
import Auxiliary from '../../hoc/Auxiliary/Auxiliary';
import Selector from '../../components/Selector/Selector';
import DateHeader from '../../components/DateHeader/DateHeader';
import DateButton from '../../components/DateButton/DateButton';
import CalendarTable from '../../components/CalendarTable/CalendarTable';

class EventHub extends Component {
    state = {
        dateObject: moment(),
        monthList: moment.months(),
        showMonthSelector: false,
        showYearSelector: false,
        selectedDay: 0
    };

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

        for (let d = 1; d <= this.getDays(); d++) {
            let currentDay = d == this.getCurrentDay() ? classes.CurrentDay : classes.Day;
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
            selectedDay: d
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

    createEvent = () => {
        this.props.history.push('/createEventForm');
        //console.log(this.props);
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

        return (
            <Auxiliary>
                {calendar}
                <button onClick={this.createEvent}>CREATE EVENT</button>
            </Auxiliary>
        );
    }
}

export default EventHub;