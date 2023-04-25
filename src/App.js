import React from 'react';
import { Route, Switch } from 'react-router-dom';
import Home from './pages/Home';
import ShoppingCart from './pages/ShoppingCart';
import Details from './pages/Details';
import Header from './components/Header';
import './App.css';

class App extends React.Component {
  state = {
    shoppingCart: [],
  };

  // Adiciona os itens no carrinho
  addShoppingCart = (title, price, thumbnail, id) => {
    const product = {
      title,
      price,
      thumbnail,
      id,
    };
    const { shoppingCart } = this.state;

    this.setState({
      shoppingCart: [...shoppingCart, product],

    }, () => {
      this.addLocalStorage();
    });
  };

  // Adiciona os itens ao localStorage
  addLocalStorage = () => {
    const { shoppingCart } = this.state;
    localStorage.setItem('shoppingCart', JSON.stringify(shoppingCart));
  };

  render() {
    const {
      shoppingCart,

    } = this.state;
    return (
      <div>
        <Header />
        <Switch>
          <Route
            exact
            path="/"
            render={ (props) => (<Home
              { ...props }
              addShoppingCart={ this.addShoppingCart }
            />) }
          />
          <Route
            path="/ShoppingCart"
            render={ () => (<ShoppingCart
              shoppingCart={ shoppingCart }

            />) }
          />
          <Route
            path="/Details/:id"
            render={ (props) => (<Details
              { ...props }
              addShoppingCart={ this.addShoppingCart }
            />) }
          />
        </Switch>
      </div>

    );
  }
}

export default App;
