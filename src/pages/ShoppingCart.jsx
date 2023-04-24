import PropTypes from 'prop-types';
import React, { Component } from 'react';
import '../style/Cart.css';

class ShoppingCart extends Component {
  render() {
    const { shoppingCart, quant, newCart } = this.props;
    return (
      <div>
        <h3 data-testid="shopping-cart-product-quantity">
          { quant }
        </h3>
        { shoppingCart.length > 0 ? (newCart
          .map(({ title, id, thumbnail, price }) => (
            <div
              key={ `${id}` }
            >
              <img src={ thumbnail } alt={ title } />
              <p data-testid="shopping-cart-product-name">{title}</p>
              <p>{price}</p>
              <p>{shoppingCart.filter((prod) => prod.id === id).length}</p>
            </div>
          )))
          : (<p data-testid="shopping-cart-empty-message">Seu carrinho está vazio.</p>
          ) }
      </div>
    );
  }
}

ShoppingCart.propTypes = {
  newCart: PropTypes.any,
  quant: PropTypes.number,
  shoppingCart: PropTypes.shape({
    filter: PropTypes.func,
    length: PropTypes.number,
    map: PropTypes.func,
  }),
}.isRequired;

export default ShoppingCart;
