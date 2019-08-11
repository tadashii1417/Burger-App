import React, {Component} from 'react';
import Aux from '../../hoc/Wrap';
import Burger from '../../components/Burger/Burger';
import BurgerBuilders from '../../components/BuildControls/BuildControls';
import Modal from '../../components/UI/Modal/Modal';
import OrderSummary from '../../components/Burger/OrderSummary/OrderSummary';

const INGREDIENT_PRICES = {
  salad: 0.5,
  bacon: 0.7,
  cheese: 0.4,
  meat: 1.3
}

class BurgerBuilder extends Component {
  state = {
    ingredients: {
      salad: 0,
      bacon: 0,
      cheese: 0,
      meat: 0
    },
    price: 4,
    purchasable: false,
    purchasing: false
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
    alert("You're continue !");
  }

  render() {
    return (
      <Aux>
        <Modal show={this.state.purchasing} 
              modalClosed={this.purchaseCancelingHandler}>
          <OrderSummary 
            ingredients={this.state.ingredients}
            totalPrice={this.state.price}
            cancelled={this.purchaseCancelingHandler}
            continued={this.purchaseContinueHandler}/>
        </Modal>

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
}

  export default BurgerBuilder;