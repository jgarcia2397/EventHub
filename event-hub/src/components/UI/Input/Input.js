import React from 'react';

import classes from './Input.module.css';

const input = (props) => {
    let inputElement = null;

    switch (props.elementType) {
        case ('input'):
            inputElement = <input 
                className={classes.InputElement} 
                {...props.elementConfig} 
                value={props.value} />;
            break;
        case ('timeInput'):
            inputElement = <input 
                className={classes.TimeInputElement} 
                {...props.elementConfig} 
                value={props.value} />;
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
            inputElement = <input 
                className={classes.InputElement} 
                {...props.elementConfig} 
                value={props.value} />;
    }
    
    return (
        <div className={classes.Input}>
            <label className={classes.Label}>{props.elementConfig.label}</label>
            {inputElement}
        </div>
    );
};

export default input;