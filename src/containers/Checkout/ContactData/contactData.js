import React, {Component}  from 'react';
import Button from '../../../components/ui/Button/button'
import classes from './contactData.css';
import axios from '../../../axios-orders';
import Spinner from '../../../components/ui/Spinner/spinner';
import Input from '../../../components/ui/Input/input';

class ContactData extends Component {
    
    state = {
        orderForm: {
            name : {
                elementType: 'input',
                elementConfig: {
                    type: 'text',
                    placeholder: 'Your Name'
                },
                value: ''
            },
            street : {
                elementType: 'input',
                elementConfig: {
                    type: 'text',
                    placeholder: 'street'
                },
                value: ''
            },
            zipCode : {
                elementType: 'input',
                elementConfig: {
                    type: 'text',
                    placeholder: 'Zip Code'
                },
                value: ''
            },
            country : {
                elementType: 'input',
                elementConfig: {
                    type: 'text',
                    placeholder: 'Country'
                },
                value: ''
            },
            email : {
                elementType: 'input',
                elementConfig: {
                    type: 'email',
                    placeholder: 'Your Email'
                },
                value: ''
            },
            deliveryMethod : {
                elementType: 'select',
                elementConfig: {
                    options: [
                        {value : 'fastest', displayValue: 'Fastest'},
                        {value : 'cheapest', displayValue: 'Cheapest'},
                    ]
                },
                value: ''
            },
        },       
        loading: false,
        purchased: false
    }

    orderHandler = (event) => {
        event.preventDefault();
        this.setState({loading : true});
        const order = this.getOrderToSubmit();
        this.submitOrderToService(order);
    }

    submitOrderToService(order){
        axios.post('/orders.json', order)
          .then(response => {
            this.setState({loading : false, purchased: true});
            this.props.history.push('/');
          })
          .catch(error => {
            this.setState({loading : false, purchased: false});
          });
      }

      inputChangedHandler = (event, inputIdentifier) => {
            const updatedOrderForm = {
                ...this.state.orderForm
            } 
            const updatedFormElement = {
                ...updatedOrderForm[inputIdentifier]
            }
            updatedFormElement.value = event.target.value;
            updatedOrderForm[inputIdentifier] = updatedFormElement;
            this.setState({orderForm : updatedOrderForm});
      };
    
      getOrderToSubmit () {
        const formData= {};
        for(let fromElementIdentifier in this.state.orderForm){
            formData[fromElementIdentifier] = this.state.orderForm[fromElementIdentifier].value;
        }
        return  {
          ingredients : this.props.ingredients,
          price : this.props.price,
          customer : formData,
          deliveryMethod : 'quickiest'
        }
      }

    render () {
        const formElementsArray = [];
        for(let key in this.state.orderForm) {
            formElementsArray.push({
                id: key,
                config: this.state.orderForm[key]
            });
        }
        let form =  <form onSubmit={this.orderHandler}>                        
                        {formElementsArray.map(formElement => (
                           <Input
                                key={formElement.id}
                                elementType={formElement.config.elementType} 
                                elementConfig={formElement.config.elementConfig}
                                value={formElement.config.value}
                                changed={(event) => this.inputChangedHandler(event, formElement.id)}
                            /> 
                        ))}
                        <Button btnType="Success"> ORDER </Button>
                    </form>;
        if(this.state.loading && !this.state.purchased){
            form = <Spinner />;
        } else if(!this.state.loading && this.state.purchased){
            form = <p> Succesfully placed the order.. </p>
        }
        
        return (
            <div className = {classes.ContactData}>
                <h4> Enter your contact data </h4>
                {form}
            </div>
        );
    }
}

export default ContactData;