import React, { Component } from 'react';
import {Route} from 'react-router-dom';
import ContactData from '../Checkout/ContactData/ContactData';
import CheckoutSummary from '../../components/Order/CheckoutSummary/CheckoutSummary';

class Checkout extends Component {
  state = {
    ingredients: null,
    totalPrice: null
  }

  componentWillMount() {
    const query= new URLSearchParams(this.props.location.search);
    const ingredients = {};
    let price = 0;

    for(let param of query.entries()) {
      // ['salad', '1']
      if(param[0] === 'price') {
        price = param[1];
      } else {
        ingredients[param[0]] = +param[1];
      }
    }
    console.log("Price is:" + price);
    console.log("Ingredients");
    console.log(ingredients);

    this.setState({ingredients: ingredients, totalPrice: price});
  }

  checkoutCancelledHandler = () => {
    this.props.history.goBack();
  }

  checkoutContinuedHandler = () => {
    this.props.history.replace('/checkout/contact-data');
  }

  componentDidMount() {
    console.log(this.props);
  }

  render() {
    return (
      <div>
        <CheckoutSummary 
          ingredients={this.state.ingredients}
          onCheckoutCancelled={this.checkoutCancelledHandler}
          onCheckoutContinued={this.checkoutContinuedHandler}
        />
        <Route 
          path={this.props.match.path + '/contact-data'}
          render = {(props) => (<ContactData 
            ingredients={this.state.ingredients} 
            totalPrice={this.state.totalPrice}
            {...props} />)}
        />
      </div>
    );
  }
}

export default Checkout;
