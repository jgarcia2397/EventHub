import React, { Component } from 'react';
import moment from 'moment';

import classes from './Calendar.module.css';

class Calendar extends Component {
    state = {
        dateObject: moment()
    };

    weekdayShortNames = moment.weekdaysShort();

    getDays = () => {
        return this.state.dateObject.daysInMonth();
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
            days.push(
                <td key={d} className={classes.Day}>
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

        totalSlots.forEach((row, i) => {
            if (i % 7 !== 0) {
                cells.push(row);
            } else {
                rows.push(cells);
                cells = [];
                cells.push(row);
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
                    <thead>
                        <tr className={classes.CalendarHeader}>{weekDays}</tr>
                    </thead>
                    <tbody>
                        {this.createCalendar()}
                    </tbody>
                </table>
            </div>
        );
    }
}

export default Calendar;