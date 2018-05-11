import React from 'react';
import Aux from '../../hoc/auxFile';
import Toolbar from '../Navigation/Toolbar/toolbar';
import classes from './layout.css';

const Layout = (props) => {
  return (
      <Aux>
      <Toolbar/>
      <main className= {classes.Content} >
        {props.children}
      </main>
      </Aux>
  );
};

export default Layout;