import React, {Component} from 'react';
import Aux from '../../hoc/auxFile'
import Burger from '../../components/Burger/burger';
import BuildControls from '../../components/Burger/BuildControls/buildControls';
import Modal from '../../components/ui/Modal/modal';
import OrderSummary from '../../components/Burger/OrderSummary/orderSummary';

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
    totalPrice: 5,
    purchasable : false,
    purchasing : false
  }

  updatePurchaseState(ingredients){
    const sum = Object.keys(ingredients)
      .map(igKey => {
        return ingredients[igKey];
      })
      .reduce((sum, el) => {
        return sum + el;
      } ,0);
      this.setState({purchasable: sum > 0});
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
    this.updatePurchaseState(updatedIngredients);
  }
  
  removeIngredientHandler = (type) => {
    let oldCount = this.state.ingredients[type];
    if(oldCount <= 0){
      return;
    }
    let updatedCount = oldCount - 1;
    let updatedIngredients = {
        ...this.state.ingredients
    };
    updatedIngredients[type] = updatedCount;
    let priceDeduction = INGREDIENT_PRICES[type];
    let oldPrice = this.state.totalPrice;
    let newPrice = oldPrice - priceDeduction;
    this.setState({totalPrice: newPrice, ingredients: updatedIngredients});
    this.updatePurchaseState(updatedIngredients);
  }

  purchasehandler = () => {
    this.setState({purchasing : true});
  }

  purchaseCancelHandler = () => {
    this.setState({purchasing : false});
  }

  purchaseContinueHandler = () => {
    alert('You continue!');
  }

  render() {
    const disabledInfo = {
      ...this.state.ingredients
    }
    for(let key in disabledInfo){
      disabledInfo[key] = disabledInfo[key] <= 0;
    }
    return (
        <Aux>
          <Modal show={this.state.purchasing}> 
            <OrderSummary 
              ingredients = {this.state.ingredients}
              purchaseCancelled = {this.purchaseCancelHandler}
              purchaseContinued={this.purchaseContinueHandler} 
              price = {this.state.totalPrice} /> 
          </Modal>
          <Burger ingredients = {this.state.ingredients}/>
          <BuildControls 
            ingredientAdded = {this.addIngredientHnadler} 
            ingredientRemoved = {this.removeIngredientHandler}
            disabled = {disabledInfo}
            purchasable = {this.state.purchasable}
            price = {this.state.totalPrice}
            ordered = {this.purchasehandler}
          />
        </Aux>
    );
  }
}

export default BurgerBuilder;