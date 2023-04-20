import PropTypes from 'prop-types';
import React, { Component } from 'react';

class ProductCard extends Component {
  render() {
    const { listProduct } = this.props;
    // console.log(listProduct);
    return (
      <section>
        {listProduct.length > 0 ? (
          listProduct.map(({ id, title, thumbnail, price }) => (
            <div data-testid="product" key={ id }>
              <img src={ thumbnail } alt={ title } />
              <p>{title}</p>
              <p>{price}</p>
            </div>
          ))
        ) : <p>Nenhum produto foi encontrado</p> }
      </section>
    );
  }
}

ProductCard.propTypes = {
  listProduct: PropTypes.array,
}.isRequery;

export default ProductCard;
