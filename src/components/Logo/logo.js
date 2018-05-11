import React from 'react';
import BurgerLogo from '../../assets/images/burger-logo.png';
import classes from './logo.css'

const logo = (props) => {
    return (
        <div className = {classes.Logo}>
            <img src={BurgerLogo} alt = "My Burger" />
        </div>
    );
};

export default logo;