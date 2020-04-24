import React from 'react';

import classes from './DateHeader.module.css';
import Auxiliary from '../../hoc/Auxiliary/Auxiliary';

const dateHeader = (props) => {
    return (
        <Auxiliary>
            <td colSpan="5">
                <div 
                    className={classes.MonthHalf}
                    onClick={() => {props.toggleMonthSel()}}>
                        <span className={classes.LabelMonth}>
                            {props.month}
                        </span>
                </div>
                <div 
                    className={classes.YearHalf}
                    onClick={() => {props.toggleYearSel()}}>
                        <span className={classes.LabelYear}>
                            {props.year}
                        </span>
                </div>
            </td>
        </Auxiliary>
    );
}

export default dateHeader;