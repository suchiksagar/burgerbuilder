import React, {Component} from 'react';
import Layout from './components/Layout/layout';
import BurgerBuilder from './containers/BurgerBuilder/burgerBuilder';
import {Container, Row, Col} from 'reactstrap';
import Checkout from './containers/Checkout/checkout.js';
import {Route, Switch} from 'react-router-dom'

class App extends Component {
  render() {
    return (
        <Container>
          <Row>
            <Col md="12">
              <Layout>
                <Switch >
                  <Route path="/" component={BurgerBuilder} exact />
                  <Route path="/checkout" component={Checkout} exact />
                </Switch>
              </Layout>
            </Col>
          </Row>
        </Container>
    );
  }
}

export default App;
