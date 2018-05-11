import React, {Component} from 'react';
import Aux from '../../hoc/auxFile'
import Burger from '../../components/Burger/burger';
import BuildControls from '../../components/Burger/BuildControls/buildControls';

const INGREDIENT_PRICES = {
  salad : 0.5,
  cheese: 0.4,
  meat: 1.3,
  bacon: 1
};

class BurgerBuilder extends Component {
  state = {
    ingredients : {
      salad: 0,
      bacon: 0,
      cheese: 0,
      meat: 0
    },
    totalPrice: 5
  }

  addIngredientHnadler = (type) => {
    let oldCount = this.state.ingredients[type];
    let updatedCount = oldCount+ 1;
    let updatedIngredients = {
        ...this.state.ingredients
    };
    updatedIngredients[type] = updatedCount;
    let priceAddition = INGREDIENT_PRICES[type];
    let oldPrice = this.state.totalPrice;
    let newPrice = oldPrice + priceAddition;
    this.setState({totalPrice: newPrice, ingredients: updatedIngredients});
  }
  
  removeIngredientHandler = (type) => {

  }

  render() {
    return (
        <Aux>
          <Burger ingredients = {this.state.ingredients}/>
          <BuildControls ingredientAdded = {this.addIngredientHnadler} />
        </Aux>
    );
  }
}

/** <Burger ingredients = {{}}/> */

export default BurgerBuilder;