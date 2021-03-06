import React from 'react';
import classes from './button.css';

const button = (props) => {
    return (
        <button 
            className = {[classes.Button, classes[props.btnType]].join(' ')}
            onClick= {props.clickHandler} > 
        {props.children} 
        </button>
    );
}

export default button;