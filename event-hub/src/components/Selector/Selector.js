import React from 'react';

import classes from './Selector.module.css';
import MonthSelector from './MonthSelector/MonthSelector';
import YearSelector from './YearSelector/YearSelector';
import Auxiliary from '../../hoc/Auxiliary/Auxiliary';

const selector = (props) => {
    return (
        <Auxiliary>
            { props.showMonthSelector 
                ? <thead className={classes.SelectorTable}>
                    <tr>
                        <td colSpan="7">
                            Select a month
                        </td>
                    </tr>
                    <MonthSelector 
                        listOfMonths={props.listOfMonths} 
                        selectedMonth={props.selectedMonth} />
                </thead>
                : null
            }
            { props.showYearSelector 
                ? <thead className={classes.SelectorTable}>
                    <tr>
                        <td colSpan="7">
                            Select a year
                        </td>
                    </tr>
                    <YearSelector
                        currentYear={props.currentYear}
                        yearRange={props.yearRange}
                        selectedYear={props.selectedYear} />
                </thead>
                : null
            }
        </Auxiliary>
    );
}

export default selector;