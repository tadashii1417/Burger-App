import React, {Component} from 'react';
import Aux from '../../hoc/Wrap';
import Burger from '../../components/Burger/Burger';
import BurgerBuilders from '../../components/BuildControls/BuildControls';
import Modal from '../../components/UI/Modal/Modal';
import OrderSummary from '../../components/Burger/OrderSummary/OrderSummary';
import Spinner from '../../components/UI/Spinner/Spinner';
import withErrorHandler from '../../hoc/withErrorHandler/withErrorHandler';
import axios from '../../axios-orders';

const INGREDIENT_PRICES = {
  salad: 0.5,
  bacon: 0.7,
  cheese: 0.4,
  meat: 1.3
}

class BurgerBuilder extends Component {
  state = {
    ingredients: null,
    price: 4,
    purchasable: false,
    purchasing: false,
    loading: false
  }

  componentDidMount() {
    axios.get('https://react-burger-58942.firebaseio.com/ingredients.json')
      .then(response => {
        this.setState({ingredients: response.data})
      })
      .catch(err => {});
  }

  updatePurchaseState (ingredients) {
    const sum = Object.keys(ingredients).map(igKey => {
      return ingredients[igKey];
    })
    .reduce(((sum, el) =>{
      return sum + el;
    }), 0);

    this.setState({purchasable: sum > 0});
  }

  addIngredientHandler = (type) => {
    const oldCount = this.state.ingredients[type];
    const updatedCount = oldCount + 1;
    const updatedIngredients = {
      ...this.state.ingredients
    };
    updatedIngredients[type] = updatedCount;
    const priceAddition = INGREDIENT_PRICES[type];
    const oldPrice = this.state.price;
    const newPrice = oldPrice + priceAddition;

    this.setState({
      ingredients: updatedIngredients,
      price: newPrice
    });
    this.updatePurchaseState(updatedIngredients);
  }

  removeIngredientHandler = (type) => {
    const oldCount = this.state.ingredients[type];
    const updatedCount = oldCount - 1;
    if (updatedCount < 0) {
      return;
    }
    const updatedIngredients = {
      ...this.state.ingredients
    };
    updatedIngredients[type] = updatedCount;
    const priceAddition = INGREDIENT_PRICES[type];
    const oldPrice = this.state.price;
    const newPrice = oldPrice - priceAddition;

    this.setState({
      ingredients: updatedIngredients,
      price: newPrice
    });
    this.updatePurchaseState(updatedIngredients);

  }

  purchaseHandler = () => {
    this.setState({purchasing: true});
  }

  purchaseCancelingHandler = () => {
    this.setState({purchasing: false});
  }

  purchaseContinueHandler = () => {
    // alert("You're continue !");
    
    const queryParams = [];
    for (let i in this.state.ingredients) {
      queryParams.push(encodeURIComponent(i) + '=' + encodeURIComponent(this.state.ingredients[i]));
    }
    queryParams.push('price=' + this.state.price);
    
    const queryString = queryParams.join('&');

    console.log(this.props);
    this.props.history.push({
      pathname: '/checkout',
      search: '?' + queryString
    });
  }

  render() {
    let orderSummary = null;
    if (this.state.ingredients) {
      orderSummary = (
        <OrderSummary 
              ingredients={this.state.ingredients}
              totalPrice={this.state.price}
              cancelled={this.purchaseCancelingHandler}
              continued={this.purchaseContinueHandler}/>
      );
    }

    if (this.state.loading) {
      orderSummary = <Spinner />;
    }

    let burger = <Spinner />

    if (this.state.ingredients) {
      burger = (
        <Aux>
          <Burger ingredients={this.state.ingredients}/>
          <BurgerBuilders
            ingredientAdded={this.addIngredientHandler}
            ingredientRemoved={this.removeIngredientHandler}
            price={this.state.price}
            purchasable={this.state.purchasable}
            ordered={this.purchaseHandler}
          />
        </Aux>
      );
    }


    return (
      <Aux>
        <Modal show={this.state.purchasing} 
              modalClosed={this.purchaseCancelingHandler}>
          {orderSummary}
        </Modal>

        {burger}
        
      </Aux>
    );
  }
}

  export default withErrorHandler(BurgerBuilder, axios);