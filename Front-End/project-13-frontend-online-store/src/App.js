import React from 'react';
import { BrowserRouter as Router, Route } from 'react-router-dom';
import './App.css';
import Home from './components/Home';
import Cart from './components/Cart';
import ProductDetails from './pages/ProductDetails';

class App extends React.Component {
  constructor() {
    super();
    this.state = {
      products: [],
      quantity: {},
    };
    this.addToProducts = this.addToProducts.bind(this);
    this.createQuantity = this.createQuantity.bind(this);
    this.handleQuantityButton = this.handleQuantityButton.bind(this);
    this.subtractQuantity = this.subtractQuantity.bind(this);
  }

  handleQuantityButton({ target }) {
    const addOrSubtract = target.innerText;

    if (addOrSubtract === '+') this.addQuantity(target.id);
    else this.subtractQuantity(target.id);
  }

  addToProducts(product) {
    const { products } = this.state;
    if (products.some((item) => product.id === item.id)) this.addQuantity(product.id);
    else {
      this.setState((prevState) => ({
        products: [...prevState.products, product],
      }), () => (this.createQuantity(product)));
    }
  }

  // Aqui vai adcionar um ítem ao objeto 'quantity' onde a chave é o id e o valor é a quantidade desse produto
  createQuantity(product) {
    this.setState((prevState) => ({
      quantity: {
        ...prevState.quantity,
        [product.id]: 1,
      },
    }));
  }

  addQuantity(productId) {
    this.setState((prevState) => ({
      quantity: {
        ...prevState.quantity,
        [productId]: prevState.quantity[productId] + 1,
      },
    }));
  }

  subtractQuantity(productId) {
    const { quantity } = this.state;
    if (quantity[productId] === 0) return null;

    this.setState((prevState) => ({
      quantity: {
        ...prevState.quantity,
        [productId]: prevState.quantity[productId] - 1,
      },
    }));
  }

  render() {
    const { products, quantity } = this.state;
    return (
      <Router>
        <Route
          exact
          path="/"
          render={ (props) => (
            <Home
              { ...props }
              addToProducts={ this.addToProducts }
            />
          ) }
        />
        <Route
          exact
          path="/shopping-cart"
          render={
            () => (<Cart
              products={ products }
              quantity={ quantity }
              handleButton={ this.handleQuantityButton }
            />)
          }
        />
        <Route
          path="/product/:id/:title"
          render={ (props) => (
            <ProductDetails { ...props } addToProducts={ this.addToProducts } />) }
        />
      </Router>
    );
  }
}

export default App;
