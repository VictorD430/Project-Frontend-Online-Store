import PropTypes from 'prop-types';
import React, { Component } from 'react';
import { getCategories,
  getProductsFromCategoryAndQuery,
} from '../services/api';
import '../style/Home.css';
import ProductCard from '../components/ProductCard';

class Home extends Component {
  constructor() {
    super();
    this.state = {
      pesquisa: '',
      categoria: '',
      getProduct: [],
      categoriasList: [],
    };
  }

  componentDidMount() {
    this.listagem();
  }

  handleChange = ({ target: { value, name } }) => {
    this.setState({
      [name]: value,
    });
  };

  fetchListProduct = async () => {
    const { pesquisa, categoria } = this.state;
    const responseProduct = await getProductsFromCategoryAndQuery(categoria, pesquisa);
    const getProduct = responseProduct.results;
    this.setState({
      getProduct,
    });
  };

  handleClick = ({ target: { value, name } }) => {
    this.setState(
      {
        [name]: value,
      },
      () => {
        this.fetchListProduct();
      },
    );
  };

  listagem = async () => {
    const categoriasList = await getCategories();
    this.setState({
      categoriasList,
    });
  };

  render() {
    const {
      pesquisa,
      categoriasList,
      getProduct,
    } = this.state;

    const { addShoppingCart } = this.props;
    return (
      <main>
        <form>
          <label htmlFor="pesquisa-inicial">
            <input
              data-testid="query-input"
              id="pesquisa-inicial"
              placeholder="Pesquisa"
              name="pesquisa"
              value={ pesquisa }
              onChange={ this.handleChange }
              type="text"
            />
          </label>
          <button
            data-testid="query-button"
            onClick={ this.fetchListProduct }
            className="input-btn-pesquisa"
            type="button"
          >
            Pesquisa
          </button>
        </form>
        <section className="products-list">
          <p data-testid="home-initial-message">
            Digite algum termo de pesquisa ou escolha uma categoria.
          </p>
          <ProductCard addShoppingCart={ addShoppingCart } listProduct={ getProduct } />
        </section>
        <aside className="categorias-list">
          <h3>Categorias:</h3>
          {categoriasList.map(({ id, name }) => (
            <div key={ id }>
              <button
                type="button"
                data-testid="category"
                name="categoria"
                id={ id }
                onClick={ this.handleClick }
                value={ id }
              >
                {name}
              </button>
            </div>
          ))}
        </aside>
      </main>
    );
  }
}

Home.propTypes = {
  addShoppingCart: PropTypes.func,
}.isRequire;

export default Home;
