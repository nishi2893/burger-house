import React, {Component} from 'react';
import Button from '../../../components/User Interface/Button/Button';
import classes from './ContactData.css';
import axios from '../../../axios-orders';
import Spinner from '../../../components/User Interface/Spinner/Spinner';
import Input from '../../../components/User Interface/Input/Input';

class ContactData extends Component{

    state={

        Form: {
            name : {
                elementType: 'input',
                elementName: 'Name',
                elementConfig:{
                    type: 'text',
                    placeholder: 'Your name'
                },
                value: '',
                validation:{
                    required: true
                },
                valid: false,
                touched: false
            },
            street : {
                elementType: 'input',
                elementName: 'Street Address',
                elementConfig:{
                    type: 'text',
                    placeholder: 'Street Address'
                
            },
            value: '',
            validation:{
                required: true
            },
            valid: false,
            touched: false
        },

            zipCode : {
                elementType: 'input',
                elementName: 'Zip Code',
                elementConfig:{
                    type: 'text',
                    placeholder: 'ZIP Code'
                
            },
            value: '',
            validation:{
                required: true,
                minLength: 5,
                maxLength: 5
            },
            valid: false,
            touched: false
        },
            country : {
                elementType: 'input',
                elementName: 'Country',
                elementConfig:{
                    type: 'text',
                    placeholder: 'Country'
                
            },
            value: '',
            validation:{
                required: true
            },
            valid: false,
            touched: false
        }, 
            email : {
                elementType: 'input',
                elementName: 'Email Address',
                elementConfig:{
                    type: 'email',
                    placeholder: 'Your E-mail'
                
            },
            value: '',
            validation:{
                required: true
            },
            valid: false,
            touched: false
        },
             deliveryMethod: {
                elementType: 'select',
                elementConfig:{
                    options: [
                        {value: 'fastest', displayValue: 'Fastest'},
                        {value: 'cheapest', displayValue: 'Cheapest'}]
                
            },
            value: '',
            validation:{},  
            valid: true
        }
        }, 
             formIsValid: false,
             loading: false
    }
    checkValidity = (value,rules) => {
        let isValid = true;

        if(rules.required)
        {
            isValid = value.trim() !== '' && isValid;
        }
        if(rules.minLength)
        {
            isValid = value.length >= rules.minLength && isValid;
        }
        if(rules.maxLength)
        {
            isValid = value.length <= rules.maxLength && isValid;
        }

        return isValid;

    }

    orderHandler= (event) => {

        console.log("in contact data",this.props.ingredients);
        event.preventDefault();
        const formData={};

        for(let formElementIdentifier in this.state.Form)
        {
            formData[formElementIdentifier]=this.state.Form[formElementIdentifier].value;
        }

        this.setState({ loading : true});
        const order={
            ingredients : this.props.ingredients,
            orderPrice  : this.props.price,
            orderData: formData
        }
        axios.post('/orders.json',order)
        .then(response => {
            this.setState({loading : false});
            this.props.history.push('/');
        }  ).catch( error =>
                {
                    this.setState({loading : false});
                }
                );
       

    }

    inputChangedHandler = (event, inputIdentifier) => {

        const updatedForm = {
            ...this.state.Form
        };
        const updatedFormElement ={
            ...updatedForm[inputIdentifier]
        };
        updatedFormElement.value=event.target.value;
        updatedFormElement.touched=true;
        updatedFormElement.valid= this.checkValidity(updatedFormElement.value, updatedFormElement.validation);
        updatedForm[inputIdentifier]=updatedFormElement;

        let formIsValid=true;

        for(let inputIdentifier in updatedForm)
        {
            formIsValid=updatedForm[inputIdentifier].valid && formIsValid;
        }
       
        this.setState({
            Form: updatedForm,
            formIsValid: formIsValid
        });

    }

    render(){

        const orderFormElements = [];

        for(let key in this.state.Form)
        {
            orderFormElements.push({
                id: key,
                config: this.state.Form[key]
            });
        }

        let form =(
            <form onSubmit={this.orderHandler}>
           
            {orderFormElements.map(formElement => (
                <Input
                key={formElement.id}
                valueType={formElement.config.elementName}
                changed={(event) => this.inputChangedHandler(event,formElement.id)}
                elementType={formElement.config.elementType}
                elementConfig={formElement.config.elementConfig}
                invalid={!formElement.config.valid}
                shouldValidate={formElement.config.validation}
                touched={formElement.config.touched}
                value={formElement.config.value} 
                />
            ))}
           
            <Button btnType="Success" disabled={!this.state.formIsValid}>ORDER</Button>
        </form>
        );
        if(this.state.loading)
        {
            form=<Spinner />;
        }
      
        return(
            <div className={classes.ContactData}>
                <h4>Enter your Contact Information</h4>
                {form}
            </div>
        );
    }


}

export default ContactData;