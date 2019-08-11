import React from 'react';
import Aux from '../../../hoc/Wrap';
import Button from '../../UI/Button/Button';


const orderSummary = (props) => {
  const ingredientSummary = Object.keys(props.ingredients)
    .map(igKey => {
      return (
      <li key={igKey}>
        <span style={{textTransform: 'capitalize'}}>{igKey}</span> : {props.ingredients[igKey]}
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
      <p>Total Price: {props.totalPrice.toFixed(1)}</p>
      <p>Continue to checkout ?</p>
      <Button btnType="Danger" clicked={props.cancelled}>CANCEL</Button>
      <Button btnType="Success" clicked={props.continued}>CONTINUE</Button>
    </Aux>
  );
};

export default orderSummary;