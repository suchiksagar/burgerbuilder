import React, {Component} from 'react';
import Aux from '../../hoc/auxFile';
import Toolbar from '../Navigation/Toolbar/toolbar';
import classes from './layout.css';
import SideDrawer from '../Navigation/SideDrawer/sideDrawer.js';

class Layout extends Component {

  state = {
    showSideDrawer : false
  }

  sideDrawerCloseHandler = () => {
    this.setState({showSideDrawer : false});
  }

  sideDrawerOpenHandler = () => {
    this.setState({showSideDrawer : true});
  }

  render () {
    return (
      <Aux>
        <Toolbar/>
        <SideDrawer open={this.state.showSideDrawer}  closed= {this.sideDrawerCloseHandler} />
        <main className= {classes.Content} >
          {this.props.children}
        </main>
      </Aux>
  );
  }

}

export default Layout;