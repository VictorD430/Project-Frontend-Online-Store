import PropTypes from 'prop-types';
import React, { Component } from 'react';

class ProductCard extends Component {
  render() {
    const { listProduct } = this.props;
    return (
      <section>
        {listProduct.map(({ id, title, thumbnail, price }) => (
          <div key={ id }>
            <img src={ thumbnail } alt={ title } />
            <p>{title}</p>
            <p>{price}</p>
          </div>

        ))}
      </section>
    );
  }
}

ProductCard.propTypes = {
  listProduct: PropTypes.array,
}.isRequery;

export default ProductCard;
