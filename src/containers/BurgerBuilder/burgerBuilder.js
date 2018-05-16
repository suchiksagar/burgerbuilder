import React, {Component} from 'react';
import Aux from '../../hoc/auxFile'
import Burger from '../../components/Burger/burger';
import BuildControls from '../../components/Burger/BuildControls/buildControls';
import Modal from '../../components/ui/Modal/modal';
import OrderSummary from '../../components/Burger/OrderSummary/orderSummary';
import axios from '../../axios-orders.js';
import Spinner from '../../components/ui/Spinner/spinner';
import withErrorHandler from '../../hoc/withErrorHandler/withErrorHandler';

const INGREDIENT_PRICES = {
  salad : 0.5,
  cheese: 0.4,
  meat: 1.3,
  bacon: 1
};

class BurgerBuilder extends Component {
  state = {
    ingredients : null,
    totalPrice: 5,
    purchasable : false,
    purchasing : false,
    loading: false,
    error : false
  }

  componentDidMount () {
    axios.get('https://react-my-burger-ec087.firebaseio.com/ingredients.json')
    .then(response => {
      this.setState({ingredients : response.data, error : false})
    })
    .catch(error => {
      this.setState({error : true});
      console.log(error);
    });
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
    const queryParams = [];
    for(let i in this.state.ingredients){
      queryParams.push(encodeURIComponent(i) + '=' + encodeURIComponent(this.state.ingredients[i])); 
    }
    queryParams.push('price=' + this.state.totalPrice);
    const queryString = queryParams.join('&');
    this.props.history.push({
      pathname: '/checkout',
      search : '?'+queryString
  });
    
    //this.setState({loading : true});
    //const order = this.getOrderToSubmit();
    //this.submitOrderToService(order);
  }

  submitOrderToService(order){
    axios.post('/orders.json', order)
      .then(response => {
        this.setState({loading : false, purchasing: false});
      })
      .catch(error => {
        this.setState({loading : false, purchasing: false});
      });
  }

  getOrderToSubmit () {
    return  {
      ingredients : this.state.ingredients,
      price : this.state.totalPrice,
      customer : {
        name : 'Bat Man',
        address : {
          street : 'Gotham City',
          zipCode : '01701',
          country : 'US'
        },
        email : 'somerandomemail@randomprovider.com'
      },
      deliveryMethod : 'quickiest'
    }
  }

  render() {
    const disabledInfo = {
      ...this.state.ingredients
    }
    for(let key in disabledInfo){
      disabledInfo[key] = disabledInfo[key] <= 0;
    }
    let orderSummary = <Spinner /> ;
    let burger = this.state.error ? <p> This page can't be loaded </p> : <Spinner />;
    if(this.state.ingredients) {
      burger = <Aux>
                  <Burger ingredients = {this.state.ingredients}/>
                  <BuildControls 
                    ingredientAdded = {this.addIngredientHnadler} 
                    ingredientRemoved = {this.removeIngredientHandler}
                    disabled = {disabledInfo}
                    purchasable = {this.state.purchasable}
                    price = {this.state.totalPrice}
                    ordered = {this.purchasehandler}
                  /> 
                </Aux>;
      orderSummary = <OrderSummary 
                        ingredients = {this.state.ingredients}
                        purchaseCancelled = {this.purchaseCancelHandler}
                        purchaseContinued={this.purchaseContinueHandler} 
                        price = {this.state.totalPrice} 
                      /> ;
    }

    if(this.state.loading){
      orderSummary = <Spinner />
    }
                
    return (
        <Aux>
          <Modal show={this.state.purchasing} modalClosed= {this.purchaseCancelHandler}> 
            {orderSummary}
          </Modal>
          {burger}
        </Aux>
    );
  }
}

export default withErrorHandler(BurgerBuilder, axios);