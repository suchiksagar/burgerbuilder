import React, {Component} from 'react';
import Layout from './components/Layout/layout';
import BurgerBuilder from './containers/BurgerBuilder/burgerBuilder';
import {Container, Row, Col} from 'reactstrap';

class App extends Component {
  render() {
    return (
        <Container>
          <Row>
            <Col md="12">
              <Layout>
                <BurgerBuilder/>
              </Layout>
            </Col>
          </Row>
        </Container>
    );
  }
}

export default App;
