import PropTypes from 'prop-types';
import React, { Component } from 'react';

class ShoppingCart extends Component {
  render() {
    const { shoppingCart } = this.props;
    return (
      <div>
        <h3 data-testid="shopping-cart-product-quantity">
          { shoppingCart.reduce }
        </h3>
        { shoppingCart.length > 0 ? (shoppingCart
          .map(({ title, id, thumbnail, price }) => (
            <div
              key={ id }
            >
              <img src={ thumbnail } alt={ title } />
              <p data-testid="shopping-cart-product-name">{title}</p>
              <p>{price}</p>
              <p>{ shoppingCart.filter((elemento) => id === elemento.id).length }</p>
            </div>
          )))
          : (<p data-testid="shopping-cart-empty-message">Seu carrinho está vazio.</p>
          ) }
      </div>
    );
  }
}

ShoppingCart.propTypes = {
  shoppingCart: PropTypes.shape({
    length: PropTypes.number,
    map: PropTypes.func,
  }).isRequired,
}.isRequire;

export default ShoppingCart;
