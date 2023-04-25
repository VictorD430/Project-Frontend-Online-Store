import PropTypes from 'prop-types';
import React, { Component } from 'react';
import { Link } from 'react-router-dom';

class ProductCard extends Component {
  render() {
    const { listProduct, addShoppingCart } = this.props;
    return (
      <section>
        {listProduct.length > 0 ? (
          listProduct.map(({ id, title, thumbnail, price }) => (
            <div key={ id } data-testid="product" className="product-card">
              <Link data-testid="product-detail-link" to={ `/Details/${id}` }>

                <img src={ thumbnail } alt={ title } />
                <p>{title}</p>
                <p>{price}</p>

              </Link>
              <button
                className="product-card-btn"
                data-testid="product-add-to-cart"
                type="button"
                onClick={ () => {
                  addShoppingCart(title, price, thumbnail, id);
                } }
              >
                Adicionar ao carrinho

              </button>
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
