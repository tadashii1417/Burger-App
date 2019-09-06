import React, {Component} from 'react';
import Button from '../../../components/UI/Button/Button';
import classes from './ContactData.module.css';
import axios from '../../../axios-orders';
import Spinner from '../../../components/UI/Spinner/Spinner';

class ContactData extends Component {
  state = {
    name: '',
    email: '',
    address: {
      street: '',
      postalCode: ''
    },
    loading: false
  }

  orderHandler = (e) => {
    // send data to back-end [.json for firebase only]
    this.setState({loading: true});
    const order = {
      ingredients: this.props.ingredients,
      price: this.props.totalPrice,
      customer: {
        name: 'Duong Truong',
        address: {
          street: 'Go vap',
          zipCode: '1234',
          country: 'Vietnam'
        },
        email: 'truong@gmail.com'
      },
      deliveryMethod: 'fastest'
    }

    axios.post('/orders.json', order)
      .then(response => {
        console.log(response);
        this.setState({loading: false});
        this.props.history.push('/');
      })
      .catch(error => {
        console.log(error);
        this.setState({loading: false});
      });
    e.preventDefault();
  }

  render() {
    let form = (
    <form>
      <input className={classes.Input} type="text" name="name" placeholder="Your Name"/>
      <input className={classes.Input} type="email" name="email" placeholder="Your Email"/>
      <input className={classes.Input} type="text" name="street" placeholder="Street"/>
      <input className={classes.Input} type="text" name="postal" placeholder="Postal Code"/>

      <Button btnType="Success" clicked={this.orderHandler}>ORDER</Button>

    </form>
    );
    if (this.state.loading) {
      form = <Spinner />
    }

    return (
      <div className={classes.ContactData}>
        <h4>Enter your Contact Data</h4>
        {form}
      </div>
    );
  }

}

export default ContactData;