import React from 'react';
import classes from './BuildControl.css';

const buildControl = (props) => (
    <div className={classes.BuildControl}>
        <div className={classes.Label}>{props.ingredientLabel}</div>
        <button onClick = {props.removedIngredient} 
        className={classes.Less} 
        disabled={props.disabled}>Less</button>
        <button onClick = {props.addedIngredient} 
        className={classes.More} 
        >More</button>
       
        </div>

);

export default buildControl;