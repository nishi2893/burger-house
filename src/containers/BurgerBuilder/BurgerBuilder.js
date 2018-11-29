import React, {Component} from 'react';
import Burger from '../../components/Burger/Burger';
import Aux from '../../hoc/Auxiliary/Auxi';
import BuildControls from '../../components/Burger/BuildControls/BuildControls';
import Modal from '../../components/User Interface/Modal/Modal';
import OrderSummary from '../../components/Burger/OrderSummary/OrderSummary';
import axios from '../../axios-orders';
import Spinner from '../../components/User Interface/Spinner/Spinner';
import withErrorHandler from '../../hoc/withErrorHandler/withErrorHandler';

const INGREDIENT_PRICES = {

    salad: 0.5,
    cheese: 0.4,
    meat: 1.3,
    bacon: 0.7

};

class BurgerBuilder extends Component{

    state = {
        ingredients : null,
        totalPrice: 4,
        purchasable: false,
        purchasing: false,
        loading: false,
        error: false
    }

    addIngredientHandler = (type) => {
            const oldCount = this.state.ingredients[type];
            const updatedCount = oldCount + 1;
            const updatedIngredients = {
                ...this.state.ingredients
            };
            updatedIngredients[type] = updatedCount; 
            const priceSummation = INGREDIENT_PRICES[type];
           
            const newPrice = this.state.totalPrice + priceSummation;

            this.setState({totalPrice:newPrice,
                           ingredients: updatedIngredients});
                           this.changePurchaseState(updatedIngredients);
            }

    removeIngredientHandler = (type) => {

        const oldCount = this.state.ingredients[type];

        if(oldCount <= 0)
        {
            return;
        }
        const updatedCount = oldCount - 1;
        const updatedIngredients = {
            ...this.state.ingredients
        };
        updatedIngredients[type] = updatedCount; 
        const priceDeduction = INGREDIENT_PRICES[type];
       
        const newPrice = this.state.totalPrice - priceDeduction;

        this.setState({totalPrice:newPrice,
                       ingredients: updatedIngredients});
                       this.changePurchaseState(updatedIngredients);
    }

    changePurchaseState = (ingredients) => {
          

            const sum = Object.keys(ingredients).map(igKey => {
                     return ingredients[igKey];
            })
            .reduce((sum, el) => {
                  return sum + el;
            },0);

            this.setState({
                purchasable: sum > 0
            });
            }

    purchaseHandler = () => {
                this.setState({purchasing : true});
        }
    purchaseCancelHandler = () => {
            this.setState({purchasing : false});
    }
    purchaseContinueHandler = () => {

       

        const queryParams = [];
        for(let i in this.state.ingredients)
        {
            queryParams.push(encodeURIComponent(i) + '=' + encodeURIComponent(this.state.ingredients[i]));
        }
        queryParams.push('price='+this.state.totalPrice);

        const query = queryParams.join('&');

             
                 this.props.history.push({
                     pathname: '/checkout',
                     search: '?' + query
                 });
}
    
componentDidMount(){
    axios.get('https://my-burger123.firebaseio.com/ingredients.json')
    .then(response => {
            this.setState({ingredients: response.data});
    })
    .catch(error => {
               this.setState({ error : true});
    });

}
    render(){

        const disabledInfo ={
            ...this.state.ingredients
        };

        let orderSummary = null;

        for(let key in disabledInfo)
        {
            disabledInfo[key] = disabledInfo[key] <= 0;
        }

        let burger = this.state.error ? <p>Ingredients can't be loaded!!</p> : <Spinner />;

        if(this.state.ingredients)
        {
            burger=
            (
            <Aux>
              <Burger ingredients={this.state.ingredients}/>
            <BuildControls ingredientAdded = {this.addIngredientHandler}
                           ingredientRemoved = {this.removeIngredientHandler}
                           disabled={disabledInfo}
                           price = {this.state.totalPrice}  
                           purchasable={this.state.purchasable}
                           ordered={this.purchaseHandler}
                           />
            </Aux> 
            );
            orderSummary=  <OrderSummary ingredients={this.state.ingredients}
        purchaseCanceled={this.purchaseCancelHandler}
        purchaseContinued={this.purchaseContinueHandler}
        price={this.state.totalPrice}/>;

        if(this.state.loading)
        {
            orderSummary = <Spinner />;
        }

        }
        //{salad:true, meat:true,...}
        return(
            <Aux>
                <Modal show={this.state.purchasing} modalClosed={this.purchaseCancelHandler}>
                   {orderSummary}
                </Modal>
                {burger}
            </Aux>
        );
    }

}

export default withErrorHandler(BurgerBuilder, axios);

