import React from 'react';
import moment from 'moment';

import classes from './CalendarTable.module.css';
import Auxiliary from '../../hoc/Auxiliary/Auxiliary';

const calendarTable = (props) => {
    let weekdayShortNames = moment.weekdaysShort();

    let weekDays = weekdayShortNames.map(day => {
        return (
            <th key={day} className={classes.WeekDay}>
                {day}
            </th>
        );
    });

    return (
        <tbody>
            { !props.showMonthSel && !props.showYearSel
                ? <Auxiliary>
                    <tr className={classes.WeekDay}>
                        {weekDays}
                    </tr>
                    {props.calendar()}
                </Auxiliary>
                : null   
            }
        </tbody> 
    );
}

export default calendarTable;