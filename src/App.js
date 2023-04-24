import React from 'react';
import { Route, Switch } from 'react-router-dom';
import Home from './pages/Home';
import ShoppingCart from './pages/ShoppingCart';
import Details from './pages/Details';
import './App.css';

class App extends React.Component {
  state = {
    shoppingCart: [],
    newCart: [],
    quant: 0,
  };

  filteredCart = (id) => {
    const { shoppingCart } = this.state;
    const itemReplicado = shoppingCart.some((item) => item.id === id);
    const sobra = shoppingCart.filter((item) => item.id !== id);
    console.log('itemReplicado', itemReplicado);
    console.log('sobra', sobra);
    this.setState(
      {},
      () => {
        this.setState({
          newCart: [...sobra, itemReplicado],
        });
      },
    );
  };

  addShoppingCart = (title, price, thumbnail, id) => {
    const product = {
      title,
      price,
      thumbnail,
      id,
    };
    const { shoppingCart, quant } = this.state;
    const itemFind = shoppingCart.find((item) => item.id === id);
    console.log(itemFind, 'itemFind');
    this.setState({
      shoppingCart: [...shoppingCart, product],
      quant: quant + 1,
    });
    this.filteredCart(id);
  };

  render() {
    const { shoppingCart, quant, newCart } = this.state;
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
              newCart={ newCart }
              quant={ quant }
            />) }
          />
          <Route path="/Details/:id" component={ Details } />
        </Switch>
      </div>

    );
  }
}

export default App;
