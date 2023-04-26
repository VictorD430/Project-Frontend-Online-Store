import PropTypes from 'prop-types';
import React, { Component } from 'react';
import '../style/Cart.css';
import { Link } from 'react-router-dom/cjs/react-router-dom.min';

class ShoppingCart extends Component {
  state = {
    listItems: [],
  };

  componentDidMount() {
    this.removeDuplicates();
  }

  // remove os itens duplicados
  removeDuplicates = () => {
    const { shoppingCart } = this.props;

    const arrayFiltered = shoppingCart
      .filter((item, index, arrayOrig) => index === arrayOrig
        .findIndex((item2) => item2.id === item.id));

    this.setState({
      listItems: arrayFiltered,
    });
  };

  render() {
    const { shoppingCart } = this.props;
    const { listItems } = this.state;
    return (
      <div className="cart-page">
        <h3>
          {`Total ${shoppingCart.length}`}
        </h3>
        { shoppingCart.length > 0 ? (listItems
          .map(({ title, id, thumbnail, price }, index) => (
            <div
              key={ `${id}${index}` }
            >
              <img src={ thumbnail } alt={ title } />
              <p data-testid="shopping-cart-product-name">{title}</p>
              <p>{price}</p>
              <p data-testid="shopping-cart-product-quantity">
                {shoppingCart.filter((prod) => prod.id === id).length}
              </p>
            </div>
          )))
          : (<p data-testid="shopping-cart-empty-message">Seu carrinho está vazio.</p>
          ) }
        <Link to="/Checkout">
         <button data-testid="checkout-products">
           Finalizar compra
         </button>
       </Link>
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
