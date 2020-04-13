import React from 'react';

import classes from './DateHeader.module.css';
import Auxiliary from '../../hoc/Auxiliary/Auxiliary';

const dateHeader = (props) => {
    return (
        <Auxiliary>
            <td 
                onClick={() => {props.toggleMonthSel()}} 
                colSpan="3">
                    <span className={classes.LabelMonth}>
                        {props.month}
                    </span>
            </td>
            <td 
                onClick={() => {props.toggleYearSel()}}
                colSpan="2">
                    <span className={classes.LabelYear}>
                        {props.year}
                    </span>
            </td>
        </Auxiliary>
    );
}

export default dateHeader;