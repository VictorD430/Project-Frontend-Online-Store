import React from 'react';
import { Route, Switch } from 'react-router-dom';
import Home from './pages/Home';
import './App.css';
import ShoppingCart from './pages/ShoppingCart';
import Details from './pages/Details';

class App extends React.Component {
  state = {
    shoppingCart: [],
  };

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
    });
  };

  render() {
    const { shoppingCart } = this.state;
    return (
      <div>
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
          <Route path="/Details/:id" component={ Details } />
        </Switch>
      </div>

    );
  }
}

export default App;
