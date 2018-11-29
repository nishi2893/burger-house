import React from 'react';
import Logo from '../../Logo/Logo';
import NavigationItems from '../NavigationItems/NavigationItems';
import classes from './SideDrawer.css';
import Backdrop from '../../User Interface/Backdrop/Backdrop';
import Aux from '../../../hoc/Auxiliary/Auxi';


const sideDrawer= (props) => {
    let assignedClasses = [classes.SideDrawer, classes.Close];

    if(props.open){
        assignedClasses= [classes.SideDrawer, classes.Open];
    }
    return(
        <Aux>
        <Backdrop show={props.open} clicked={props.closed}/>
        <div className={assignedClasses.join(' ')}>
        <div className={classes.Logo}>
        <Logo />
        </div>
        <nav>
        <NavigationItems />
        </nav>
        </div>
        </Aux>
    );
};

export default sideDrawer;