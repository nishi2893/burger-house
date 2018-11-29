import React from 'react';
import classes from './Input.css';

const input = (props) => {

    let inputElement= null;
    const inputClasses= [classes.InputElement];
    let validationError=null;

    if(props.invalid && props.shouldValidate && props.touched){
        inputClasses.push(classes.Invalid);
        validationError=<p className={classes.ValidationError}>Please enter a valid {props.valueType}</p>;
    }

    switch(props.elementType)
    {
        case ('input'):
             inputElement=<input {...props.elementConfig} 
             value={props.value} 
             className={inputClasses.join(' ')}
             onChange={props.changed}/>
             break;
        case ('textarea'):
             inputElement=<textarea {...props.elementConfig} 
             value={props.value} 
             className={inputClasses.join(' ')}
             onChange={props.changed}/>
             break;
        case ('select'):
             inputElement=(
             <select  
             value={props.value} 
             onChange={props.changed}
             className={inputClasses.join(' ')}>
             {props.elementConfig.options.map(option => (
                 <option value={option.value} key={option.value}>{option.displayValue}</option>
             ))}
             </select>
             );
             break;
             default: 
             inputElement=<textarea {...props.elementConfig} 
             value={props.value} 
             onChange={props.changed}
             className={inputClasses.join(' ')}/>     
    }

    return(
        <div className={classes.Input}>
            <label className={classes.Label}>{props.label}</label>
            {inputElement}
            {validationError}
        </div>
    );

}

export default input;