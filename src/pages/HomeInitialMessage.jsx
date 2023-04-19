import React, { Component } from 'react';
import { Link } from 'react-router-dom';

class HomeInitialMessage extends Component {
  render() {
    return (
      <main>
        <label htmlFor="pesquisa-inicial">
          <input
            id="pesquisa-inicial"
            placeholder="Pesquisa"
            name="pesquisa-inicial"
            type="text"
          />
        </label>
        <button type="button">
          <Link to="/ShoppingCart" data-testid="shopping-cart-button">
            Carrinho de compras
          </Link>
        </button>
        <p data-testid="home-initial-message">
          Digite algum termo de pesquisa ou escolha uma categoria.
        </p>
      </main>
    );
  }
}

export default HomeInitialMessage;
