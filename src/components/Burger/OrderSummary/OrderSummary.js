import React, {Component} from 'react';

import Aux from '../../../hoc/Wrap';
import Button from '../../UI/Button/Button';


class OrderSummary extends Component {
  componentWillUpdate(){
    console.log("OrderSummary update")
  }

  render() {
    const ingredientSummary = Object.keys(this.props.ingredients)
    .map(igKey => {
      return (
      <li key={igKey}>
        <span style={{textTransform: 'capitalize'}}>{igKey}</span> : {this.props.ingredients[igKey]}
      </li>
      );
    });

    return (
    <Aux>
      <h3>Your order</h3>
      <p>A delicious burger with the following ingredients.</p>
      <ul>
        {ingredientSummary}
      </ul>
      <p>Total Price: {this.props.totalPrice.toFixed(1)}</p>
      <p>Continue to checkout ?</p>
      <Button btnType="Danger" clicked={this.props.cancelled}>CANCEL</Button>
      <Button btnType="Success" clicked={this.props.continued}>CONTINUE</Button>
    </Aux>
  );
}
};

export default OrderSummary;