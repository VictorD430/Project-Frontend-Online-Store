import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom/cjs/react-router-dom.min';
import { getProductById } from '../services/api';
// import icon from '../imagens/shopping-cart.png';

class Details extends Component {
  state = {
    product: {},
    avaliacoes: [],
    email: '',
    textarea: '',
    notas: '',
    validacao: '',
    erro: false,
  };

  componentDidMount() {
    this.fetchProduct();
    const {
      match: {
        params: { id },
      },
    } = this.props;
    const listAvaliacoes = JSON.parse(localStorage.getItem(id));
    if (listAvaliacoes !== null) {
      this.setState({ avaliacoes: listAvaliacoes });
    }
  }

  fetchProduct = async () => {
    const {
      match: {
        params: { id },
      },
    } = this.props;
    const product = await getProductById(id);
    this.setState({
      product,
    });
  };

  handleClickForm = () => {
    const {
      match: {
        params: { id },
      },
    } = this.props;
    const { email, textarea, notas, validacao, avaliacoes } = this.state;
    if (validacao) {
      const atualizaAvaliacoes = [...avaliacoes, { email, textarea, notas }];
      localStorage.setItem(id, JSON.stringify(atualizaAvaliacoes));
      this.setState({
        email: '',
        textarea: '',
        notas: '',
        validacao: '',
        erro: false,
        avaliacoes: atualizaAvaliacoes,
      });
    } else {
      this.setState({ erro: true });
    }
  };

  handleClickNota = ({ target: { value } }) => {
    this.setState({ notas: value }, this.validationForm);
  };

  validationForm = () => {
    const { email, notas } = this.state;
    const validacao = email.includes('@') && notas >= 1;
    this.setState({ validacao });
  };

  onInputChange = ({ target }) => {
    const { name, value } = target;
    this.setState({ [name]: value }, this.validationForm);
  };

  render() {
    const { product, email, textarea, erro, avaliacoes } = this.state;
    const { addShoppingCart } = this.props;
    const {
      title,
      price,
      thumbnail,
      id,
    } = product;
    return (
      <>
        <section>
          <Link to="/">
            <img
              className="details__icon--home"
              //   src={ icon }
              alt="voltar"
            />
          </Link>

        </section>
        <div className="details__card--product">
          <p data-testid="product-detail-name" className="details__card--title">
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
          <button
            data-testid="product-detail-add-to-cart"
            onClick={ () => {
              addShoppingCart(title, price, thumbnail, id);
            } }
          >
            Adicionar ao carrinho
          </button>
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
            <div>
              <input
                type="checkbox"
                data-testid="1-rating"
                value="1"
                onClick={ this.handleClickNota }
              />
              <input
                type="checkbox"
                data-testid="2-rating"
                value="2"
                onClick={ this.handleClickNota }
              />
              <input
                type="checkbox"
                data-testid="3-rating"
                value="3"
                onClick={ this.handleClickNota }
              />
              <input
                type="checkbox"
                data-testid="4-rating"
                value="4"
                onClick={ this.handleClickNota }
              />
              <input
                type="checkbox"
                data-testid="5-rating"
                value="5"
                onClick={ this.handleClickNota }
              />
            </div>

            <br />
            <textarea
              data-testid="product-detail-evaluation"
              name="textarea"
              onChange={ this.onInputChange }
              value={ textarea }
              type="text"
              placeholder="detalhes sobre o produto"
            />
            <br />
            <button
              data-testid="submit-review-btn"
              type="button"
              onClick={ this.handleClickForm }
            >
              enviar avaliação
            </button>
            {erro && <p data-testid="error-msg">Campos inválidos</p>}
          </form>
          {avaliacoes ? (
            avaliacoes.map((item, index) => (
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
            ))
          ) : (
            <p>Ainda não há avaliações.</p>
          )}
        </div>
      </>
    );
  }
}

Details.propTypes = {
  addShoppingCart: PropTypes.array,
  match: PropTypes.shape({
    params: PropTypes.shape({
      id: PropTypes.string,
    }),
  }).isRequired,
}.isRequired;

export default Details;
