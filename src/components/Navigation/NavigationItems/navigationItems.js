import React from 'react';
import classes from './navigationItems.css'
import NavigationItem from './NavigationItem/navigationItem';

const navigationItems = (props) => {
    return (
        <ul className= {classes.NavigationItems}>
           <NavigationItem link="/" exact={true} > Burger Builder </NavigationItem>
           <NavigationItem link="/orders"> Orders </NavigationItem>
        </ul>
    );
};

export default navigationItems;
