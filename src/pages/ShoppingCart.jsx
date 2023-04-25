import PropTypes from 'prop-types';
import React, { Component } from 'react';
import '../style/Cart.css';

class ShoppingCart extends Component {
  state = {
    listItems: [],
  };

  componentDidMount() {
    // const { shoppingCart } = this.props;
    // console.log(shoppingCart);
    // const listItems = this.removeDuplicates(shoppingCart, 'id');
    // this.setState({
    //   listItems,
    // });
    this.removeDuplicates();
  }

  removeDuplicates = () => {
    const { shoppingCart } = this.props;
    // console.log(shoppingCart);
    // let arrayFiltered = [];
    const arrayFiltered = shoppingCart
      .filter((item, index, arrayOrig) => index === arrayOrig
        .findIndex((item2) => item2.id === item.id));

    this.setState({
      listItems: arrayFiltered,
    });
    // shoppingCart.forEach((item, index, arrayOriginal) => {
    //   arrayOriginal.forEach((item2,index2) => {
    //     if (item.id !== item2.id && arrayFiltered.find((obj) => obj.id !== item.id)) {
    //       arrayFiltered = [...arrayFiltered, item];
    //     }
    //   });
    // });

    // shoppingCart.forEach((item, index, array) => {
    //   if (array.some((item2) => item2.id !== item.id)) {
    //     arrayFiltered = [...arrayFiltered, item];
    //   }
    // });
    // this.setState({
    //   listItems: arrayFiltered,
    // })
    // console.log(arrayFiltered);
  };

  render() {
    const { shoppingCart } = this.props;
    const { listItems } = this.state;
    // console.log(listItems)
    return (
      <div>
        <h3>
          {`Total ${shoppingCart.length}`}
        </h3>
        { shoppingCart.length > 0 ? (listItems
          .map(({ title, id, thumbnail, price }, index) => (
            <div
              key={ `${id}${index}` }
            >
              <img src={ thumbnail } alt={ title } />
              <p>{title}</p>
              <p>{price}</p>
              <p>
                {shoppingCart.filter((prod) => prod.id === id).length}
              </p>
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
