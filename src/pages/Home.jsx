import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { getCategories,
  getProductsFromCategoryAndQuery,
  // getProductById,
} from '../services/api';
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

  async componentDidMount() {
    this.listagem();
  }

  handleChange = ({ target: { value, name } }) => {
    // console.log(target)
    // console.log( value)
    // console.log(name)
    this.setState({
      [name]: value,
    });
  };

  fetchListProduct = async () => {
    const { pesquisa, categoria } = this.state;
    const responseProduct = await getProductsFromCategoryAndQuery(categoria, pesquisa);
    const getProduct = responseProduct.results;
    // console.log(getProduct);
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
    // console.log(categoriasList)
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

        <button type="button">
          <Link to="/ShoppingCart" data-testid="shopping-cart-button">
            Carrinho de compras
          </Link>
        </button>
        <p data-testid="home-initial-message">
          Digite algum termo de pesquisa ou escolha uma categoria.
        </p>

        <ProductCard listProduct={ getProduct } />

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

export default Home;
