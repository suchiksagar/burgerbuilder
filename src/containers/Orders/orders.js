import React, {Component} from 'react';
import Order from '../../components/Order/order';
import axios from '../../axios-orders';
import withErrorHandler from '../../hoc/withErrorHandler/withErrorHandler';

class Orders extends Component {

    state = {
        orders : [],
        loading: true
    }

    componentDidMount () {
        axios.get('/orders.json')
        .then(res => {
            const fetchedOrders = [];
            for(let key in res.data){
                fetchedOrders.push({
                    ...res.data[key],
                    id : key
                });
            }
            this.setState({orders : fetchedOrders, loading: false});
        })
        .catch(error => {
            console.log(error);
            this.setState({orders : [], loading: false});
        });
    }

    render (){
        let orders = this.buildOrders();
        return (
            <div>
                {orders}
            </div>
        );
    }

    buildOrders(){
        return this.state.orders.map(order => {
            return <Order 
                        key={order.id} 
                        ingredients={order.ingredients} 
                        price={order.price} 
                    />
        });
    }
}

export default withErrorHandler(Orders, axios);