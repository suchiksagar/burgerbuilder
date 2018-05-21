import React, {Component}  from 'react';
import Button from '../../../components/ui/Button/button'
import classes from './contactData.css';
import axios from '../../../axios-orders';
import Spinner from '../../../components/ui/Spinner/spinner';
import Input from '../../../components/ui/Input/input';

class ContactData extends Component {
    
    state = {
        name : '',
        email: '',
        address : {
            street : '',
            postalCode : ''
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
    
      getOrderToSubmit () {
        return  {
          ingredients : this.props.ingredients,
          price : this.props.price,
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

    render () {
        let form =  <form>
                        <Input inputtype={"input"} type="text" name="name" placeholder="Your Name"  />
                        <Input inputtype={"input"} type="email" name="email" placeholder="Your Email"  />
                        <Input inputtype={"input"} type="text" name="street" placeholder="Your Street"  />
                        <Input inputtype={"textarea"} type="text" name="postal" placeholder="Your Zip Code"  />
                        <Button btnType="Success" clickHandler={this.orderHandler}> ORDER </Button>
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