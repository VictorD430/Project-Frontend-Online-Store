import PropTypes from 'prop-types';
import React, { Component } from 'react';
import { Link } from 'react-router-dom';

class ProductCard extends Component {
  render() {
    const { listProduct } = this.props;
    return (
      <section>
        {listProduct.length > 0 ? (
          listProduct.map(({ id, title, thumbnail, price }) => (
            <div key={ id } data-testid="product">
              <Link data-testid="product-detail-link" to={ `/Details/${id}` }>

                <img src={ thumbnail } alt={ title } />
                <p>{title}</p>
                <p>{price}</p>

              </Link>
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
