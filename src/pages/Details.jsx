import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom/cjs/react-router-dom.min';
import { getProductById } from '../services/api';
// import icon from '../imagens/shopping-cart.png';

class Details extends Component {
  state = {
    product: {},
  };

  componentDidMount() {
    this.fetchProduct();
  }

  fetchProduct = async () => {
    const { match: { params: { id } } } = this.props;
    const product = await getProductById(id);
    this.setState({
      product,
    });
  };

  render() {
    const { product } = this.state;
    const {
      title,
      price,
      thumbnail,
    //   descriptions,
    } = product;
    console.log(price);
    return (

      <>
        <section>
          <Link
            to="/"
          >
            <img
              className="details__icon--home"
              //   src={ icon }
              alt="voltar"
            />
          </Link>
          <Link
            data-testid="shopping-cart-button"
            to="/ShoppingCart"
          >
            <img
              className="details__icon--shopping-cart"
              //   src={ icon }
              alt="carrinho"
            />
          </Link>
        </section>
        <div className="details__card--product">
          <p
            data-testid="product-detail-name"
            className="details__card--title"
          >
            { title }
          </p>
          <p
            data-testid="product-detail-price"
            className="details__card--price"
          >
            {`R$ ${price}`}
          </p>
          <img
            data-testid="product-detail-image"
            className="details__card--image"
            src={ thumbnail }
            alt={ title }
          />
        </div>
      </>
    );
  }
}

Details.propTypes = {
  match: PropTypes.shape({
    params: PropTypes.shape({
      id: PropTypes.string,
    }),
  }).isRequired,
};

export default Details;
