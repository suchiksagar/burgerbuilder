import React from 'react';
import Burger from '../../Burger/burger';
import Button from '../../ui/Button/button';
import classes from './checkoutSummary.css';

const checkoutSummary = (props) => {
    return (
        <div className={classes.CheckoutSummary}> 
            <h1> We hope it tastes great </h1>
            <div style ={{width : '100%', margin: 'auto'}}>
                <Burger ingredients = {props.ingredients} />
            </div>
            <Button btnType="Danger" clickHandler={props.checkoutCancelled}>CANCEL </Button>
            <Button btnType="Success" clickHandler={props.checkoutContinued}>CONTINUE </Button>
        </div>
    );
}

export default checkoutSummary;