import React from 'react';

import classes from './Input.module.css';

const input = (props) => {
    let inputElement = null;
    const textInputClasses = [classes.InputElement];
    const timeInputClasses = [classes.TimeInputElement];

    if (props.invalidElement && props.timeElement) {
        timeInputClasses.push(classes.Invalid);
    } else if (props.invalidElement) {
        textInputClasses.push(classes.Invalid);
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
            {inputElement}
        </div>
    );
};

export default input;