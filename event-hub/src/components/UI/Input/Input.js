import React from 'react';

import classes from './Input.module.css';

const input = (props) => {
    let inputElement = null;
    let validationError = null;
    const textInputClasses = [classes.InputElement];
    const timeInputClasses = [classes.TimeInputElement];

    if ((props.invalidElement && props.timeElement && props.touched) || (props.invalidDateTime && props.timeElement)) {
        timeInputClasses.push(classes.Invalid);
        // validationError = <p>Please enter a valid value.</p>;
    } else if (props.invalidElement && props.touched) {
        textInputClasses.push(classes.Invalid);
        validationError = <p>Please enter a valid value.</p>;
    }

    switch (props.elementType) {
        case ('input'):
            inputElement = <input 
                className={textInputClasses.join(' ')} 
                {...props.elementConfig} 
                value={props.value} 
                onChange={props.changed} />;
            break;
        case ('timeInput'):
            inputElement = <input 
                className={timeInputClasses.join(' ')} 
                {...props.elementConfig} 
                value={props.value} 
                onChange={props.changed} />;
            break;
        case ('select'):
            inputElement = <select 
                className={timeInputClasses.join(' ')}
                value={props.value} 
                onChange={props.changed}>
                    {props.elementConfig.options.map(option => (
                        <option key={option.value} value={option.value}>
                            {option.displayValue}
                        </option>
                    ))} 
            </select>;
            break;
        default:
            inputElement = <input 
                className={textInputClasses.join(' ')} 
                {...props.elementConfig} 
                value={props.value} 
                onChange={props.changed} />;
    }
    
    return (
        <div className={classes.Input}>
            <label className={classes.Label}>{props.elementConfig.label}</label>
            {validationError}
            {inputElement}
        </div>
    );
};

export default input;