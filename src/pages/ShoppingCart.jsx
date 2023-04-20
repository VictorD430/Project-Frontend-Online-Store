import React, { Component } from 'react';
import '../style/Cart.css';

class ShoppingCart extends Component {
  render() {
    return (
      <div>
        <p data-testid="shopping-cart-empty-message">Seu carrinho está vazio.</p>
      </div>
    );
  }
}

export default ShoppingCart;
