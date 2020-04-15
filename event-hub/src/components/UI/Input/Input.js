import React from 'react';

import classes from './Input.module.css';

const input = (props) => {
    let inputElement = null;

    switch (props.inputtype) {
        case ('input'):
            inputElement = <input className={classes.InputElement} {...props} />;
            break;
        case ('timeInput'):
            inputElement = <input className={classes.TimeInputElement} {...props} />;
            break;
        /*case ('select'):
            inputElement = <select className={classes.TimeInputElement} {...props}>
               {props.elementConfig.options.map(option => (
                    <option key={option.value} value={option.value}>
                        {option.displayValue}
                    </option>
                ))} 
            </select>;
            break;*/
        default:
            inputElement = <input className={classes.InputElement} />;
    }
    
    return (
        <div className={classes.Input}>
            <label className={classes.Label}>{props.label}</label>
            {inputElement}
        </div>
    );
};

export default input;