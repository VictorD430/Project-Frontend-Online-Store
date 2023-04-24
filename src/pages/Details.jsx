import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom/cjs/react-router-dom.min';
import { getProductById } from '../services/api';
// import icon from '../imagens/shopping-cart.png';

class Details extends Component {
  state = {
    product: {},
    email: '',
    textarea: '',
    notas: '',
    validacao: '',
    erro: false,
    avaliacoes: [],
  };

  componentDidMount() {
    this.fetchProduct();
    const { match: { params: { id } } } = this.props;
    const listAvaliacoes = localStorage.getItem(id);
    console.log(listAvaliacoes);
    this.setState({ avaliacoes: [...listAvaliacoes] });
  }

  fetchProduct = async () => {
    const { match: { params: { id } } } = this.props;
    const product = await getProductById(id);
    this.setState({
      product,
    });
  };

  handleClickForm = () => {
    const { match: { params: { id } } } = this.props;
    const { email, textarea, notas, validacao, avaliacoes } = this.state;
    // console.log(validacao);
    if (validacao === true) {
      const objAvaliacao = { email, textarea, notas };
      this.setState({ avaliacoes: [...avaliacoes, objAvaliacao] });
      localStorage.setItem(id, JSON.stringify(avaliacoes));
      const listAvaliacoes = localStorage.getItem(id);
      console.log(listAvaliacoes);
      this.setState({
        email: '',
        textarea: '',
        notas: '',
        validacao: '',
      });
    } else {
      this.setState({ erro: true });
    }
  };

  validationForm = () => {
    const { email, notas } = this.state;
    // melhorar essa lógica depois
    const validacao = email.includes('@') && notas >= 1;
    // console.log(validacao);
    // console.log(typeof notas);
    this.setState({ validacao });
  };

  onInputChange = ({ target }) => {
    const { name, value } = target;
    this.setState({ [name]: value }, this.validationForm);
    // console.log(value);
  };

  render() {
    const { product, email, textarea, erro, avaliacoes } = this.state;
    const {
      title,
      price,
      thumbnail,
      //   descriptions,
    } = product;
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
            {title}
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
        <div>
          <form>
            <input
              data-testid="product-detail-email"
              type="text"
              name="email"
              onChange={ this.onInputChange }
              value={ email }
              placeholder="email"
              required
            />
            <select
              name="notas"
              required
              onChange={ this.onInputChange }
            >
              <option data-testid="1-rating" value="1">1</option>
              <option data-testid="2-rating" value={ 2 }>2</option>
              <option data-testid="3-rating" value={ 3 }>3</option>
              <option data-testid="4-rating" value={ 4 }>4</option>
              <option data-testid="5-rating" value={ 5 }>5</option>
            </select>
            <textarea
              data-testid="product-detail-evaluation"
              name="textarea"
              onChange={ this.onInputChange }
              value={ textarea }
              type="text"
              placeholder="detalhes sobre o produto"
            />
            <button
              data-testid="submit-review-btn"
              type="button"
              onClick={ this.handleClickForm }
            >
              enviar avaliação
            </button>
            {erro && <p data-testid="error-msg">Campos inválidos</p>}
          </form>
          {avaliacoes.length > 0 ? avaliacoes.map((item, index) => (
            <div key={ index }>
              <p data-testid="review-card-email">
                {' '}
                {item.email}
              </p>
              <p data-testid="review-card-rating">
                {' '}
                {item.textarea}
              </p>
              <p data-testid="review-card-evaluation">
                {' '}
                {item.notas}
              </p>
            </div>
          )) : <p>Ainda não há avaliações.</p>}
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
