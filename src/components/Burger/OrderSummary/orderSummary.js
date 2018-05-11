import React from 'react';
import Aux from '../../../hoc/auxFile';
import Button from '../../ui/Button/button.js';

const orderSummary = (props) => {

    const ingredientSummary = Object.keys(props.ingredients)
        .map(igKey => {
            return (
                    <li key = {igKey}> 
                        <span style = {{textTransform : 'capitalize'}}> {igKey} </span> : {props.ingredients[igKey]} 
                    </li>
                    );
        });

return (
    <Aux>
        <h3> Your Order </h3>
        <p> A delicious burger with the following ingredients: </p>
        <ul>
            {ingredientSummary}
        </ul>
        <p> Continue to Checkout </p>
        <Button btnType="Danger" clickHandler={props.purchaseCancelled} > CANCEL </Button>
        <Button btnType="Success" clickHandler={props.purchaseContinued}> CONTINUE </Button>

    </Aux>
);
};

export default orderSummary;