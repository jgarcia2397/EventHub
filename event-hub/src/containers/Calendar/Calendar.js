import React, { Component } from 'react';
import moment from 'moment';

import classes from './Calendar.module.css';
import MonthSelector from '../../components/MonthSelector/MonthSelector';

class Calendar extends Component {
    state = {
        dateObject: moment(),
        monthList: moment.months(),
        showMonthSelector: false
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
                <td key={d} className={currentDay}>
                    {d}
                </td>
            );
        }
        // console.log("Days: ", days);
        return days;
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

    toggleMonthSelector = () => {
        this.setState({
            showMonthSelector: !this.state.showMonthSelector
        });
    }

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
                                onClick={() => {this.toggleMonthSelector()}} 
                                colSpan="7">
                                    <span className={classes.LabelMonth}>
                                        {this.getMonth()}
                                    </span>
                            </td>
                        </tr>
                        
                        <tr>
                            <td colSpan="7">
                                <table className={classes.MonthListTable}>
                                    { this.state.showMonthSelector 
                                        ? <div>
                                            <tr>
                                                <td colSpan="7">
                                                    Select a month
                                                </td>
                                            </tr>
                                            <MonthSelector 
                                                listOfMonths={this.state.monthList} 
                                                selectedMonth={this.selectMonth} />
                                        </div>
                                        : null
                                    }
                                </table>
                            </td>
                        </tr>
                    </thead>
                    { !this.state.showMonthSelector 
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