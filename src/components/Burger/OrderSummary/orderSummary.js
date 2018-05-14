import React, {Component} from 'react';
import Aux from '../../../hoc/auxFile';
import Button from '../../ui/Button/button.js';

class OrderSummary extends Component {
    //This can be a functioanl componnent and doesn't have to be a class

    componentWillUpdate() {
        console.log("[OrderSummary] Will Update");
    }

    render () {
        const ingredientSummary = Object.keys(this.props.ingredients)
            .map(igKey => {
                return (
                        <li key = {igKey}> 
                            <span style = {{textTransform : 'capitalize'}}> {igKey} </span> : {this.props.ingredients[igKey]} 
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
                <p> <strong> Total Price: {this.props.price.toFixed(2)} </strong> </p>
                <p> Continue to Checkout </p>
                <Button btnType="Danger" clickHandler={this.props.purchaseCancelled} > CANCEL </Button>
                <Button btnType="Success" clickHandler={this.props.purchaseContinued}> CONTINUE </Button>
            </Aux>
        );
    }
};

export default OrderSummary;