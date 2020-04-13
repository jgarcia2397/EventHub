import React from 'react';

import classes from './DateButton.module.css';

const dateButton = (props) => {
    let button = null;

    if (props.type === "prev") {
        button = (
            <td 
                onClick={() => {props.prevClick()}}
                colSpan="1">
                    <button className={classes.ButtonPrev}>&#8249;</button>
            </td>
        );
    } else if (props.type === "next") {
        button = (
            <td 
                onClick={() => {props.nextClick()}}
                colSpan="1">
                    <button className={classes.ButtonNext}>&#8250;</button>
            </td>
        );
    }

    return (
        button
    );
}

export default dateButton;