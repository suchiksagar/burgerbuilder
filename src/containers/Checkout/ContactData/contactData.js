import React, {Component}  from 'react';
import Button from '../../../components/ui/Button/button'
import classes from './contactData.css';

class ContactData extends Component {
    
    state = {
        name : '',
        email: '',
        address : {
            street : '',
            postalCode : ''
        }
    }

    render () {
        return (
            <div className = {classes.ContactData}>
                <h4> Enter your contact data </h4>
                <form>
                    <input type="text" name="name" placeholder="Your Name" className={classes.Input} />
                    <input type="text" name="email" placeholder="Your Email" className={classes.Input} />
                    <input type="text" name="street" placeholder="Your Street" className={classes.Input} />
                    <input type="text" name="postal" placeholder="Your Zip Code" className={classes.Input} />
                    <Button btnType="Success">ORDER </Button>
                </form>
            </div>
        );
    }
}

export default ContactData;