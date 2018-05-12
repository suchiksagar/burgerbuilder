import React from 'react';
import Logo from '../../Logo/logo';
import NavigationItems from '../NavigationItems/navigationItems';
import classes from './sideDrawer.css';
import Backdrop from '../../ui/Backdrop/backdrop';
import Aux from '../../../hoc/auxFile';

const sideDrawer = (props) => {
    let attchedClasses = [classes.SideDrawer, classes.Close];
    if(props.open){
        attchedClasses = [classes.SideDrawer, classes.Open];
    }
    return (
        <Aux>
            <Backdrop show= {props.open} clicked={props.closed}/>
            <div className={attchedClasses.join(' ')}>
                <div className = {classes.Logo}>
                    <Logo/>
                </div>
                <nav>
                    <NavigationItems />
                </nav>
            </div>
        </Aux>
    );
};

export default sideDrawer;
