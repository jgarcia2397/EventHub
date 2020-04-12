import React, { Component } from 'react';
import moment from 'moment';

import classes from './Calendar.module.css';
import MonthSelector from '../../components/MonthSelector/MonthSelector';
import YearSelector from '../../components/YearSelector/YearSelector';

class Calendar extends Component {
    state = {
        dateObject: moment(),
        monthList: moment.months(),
        showMonthSelector: false,
        showYearSelector: false,
        selectedDay: 0
    };

    weekdayShortNames = moment.weekdaysShort();

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
        var currentYear = moment(startYear);
        var endYear = moment(stopYear);
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

    render () {
        let weekDays = this.weekdayShortNames.map(day => {
            return (
                <th key={day} className={classes.WeekDay}>
                    {day}
                </th>
            );
        });

        return (
            <div className={classes.CalendarContainer}>
                <table className={classes.Calendar}>
                    <thead className={classes.CalendarHeader}>
                        <tr>
                            <td 
                                onClick={() => {this.onPrev()}}
                                colSpan="1">
                                    <a className={classes.ButtonPrev}>&#8249;</a>
                            </td>
                            <td 
                                onClick={() => {this.toggleMonthSelector()}} 
                                colSpan="3">
                                    <span className={classes.LabelMonth}>
                                        {this.getMonth()}
                                    </span>
                            </td>
                            <td 
                                onClick={() => {this.toggleYearSelector()}}
                                colSpan="2">
                                    <span className={classes.LabelYear}>
                                        {this.getYear()}
                                    </span>
                            </td>
                            <td 
                                onClick={() => {this.onNext()}}
                                colSpan="1">
                                    <a className={classes.ButtonNext}>&#8250;</a>
                            </td>
                        </tr>
                        <tr>
                            <td colSpan="7">
                                <table className={classes.MonthListTable}>
                                    { this.state.showMonthSelector 
                                        ? <tbody>
                                            <tr>
                                                <td colSpan="7">
                                                    Select a month
                                                </td>
                                            </tr>
                                            <MonthSelector 
                                                listOfMonths={this.state.monthList} 
                                                selectedMonth={this.selectMonth} />
                                        </tbody>
                                        : null
                                    }
                                    { this.state.showYearSelector 
                                        ? <tbody>
                                            <tr>
                                                <td colSpan="7">
                                                    Select a year
                                                </td>
                                            </tr>
                                            <YearSelector
                                                moment={this.state.dateObject}
                                                currentYear={this.getYear()}
                                                yearRange={this.getYearRange}
                                                selectedYear={this.selectYear} />
                                        </tbody>
                                        : null
                                    }
                                </table>
                            </td>
                        </tr>
                    </thead>
                    { !this.state.showMonthSelector && !this.state.showYearSelector
                        ? <tbody>
                            <tr className={classes.WeekDay}>
                                {weekDays}
                            </tr>
                            {this.createCalendar()}
                        </tbody> 
                        : null   
                    }
                </table>
            </div>
        );
    }
}

export default Calendar;