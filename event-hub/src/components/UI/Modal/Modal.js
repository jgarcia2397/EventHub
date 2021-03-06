import React from 'react';

import classes from './Modal.module.css';
import Auxiliary from '../../../hoc/Auxiliary/Auxiliary';
import Backdrop from '../Backdrop/Backdrop';

const modal = (props) => {
    return (
        <Auxiliary>
            <Backdrop show={props.show} close={props.close} />
            <div 
                className={classes.Modal}
                style={{
                    opacity: props.show ? '1' : '0'
                }}>
                    {props.children}
            </div>
        </Auxiliary>
    );
}

export default modal;