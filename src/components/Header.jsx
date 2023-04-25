import React, { Component } from 'react';
import { Link } from 'react-router-dom';
// import PropTypes from 'prop-types';
import cartIcon from '../imagens/shopping-cart.png';
import '../style/Header.css';

export default class Header extends Component {
  render() {
    // const { quant } = this.props;
    return (
      <header className="header">
        <div className="title">
          <Link to="/">
            <h1>Frontend Online Store</h1>
          </Link>
        </div>
        <div className="cart-button">
          <button className="btn-shopping-cart" type="button">
            <Link to="/ShoppingCart" data-testid="shopping-cart-button">
              <img
                src={ cartIcon }
                alt="Carrinho de Compras"
                className="cart-icon"
              />
            </Link>
          </button>
        </div>
      </header>
    );
  }
}

// Header.propTypes = {
//   quant: PropTypes.string,
// }.isRequired;
