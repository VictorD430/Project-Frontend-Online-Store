import React, { Component } from 'react';
import { getCategories } from '../services/api';

class HomeInitialMessage extends Component {
  constructor() {
    super();
    this.state = {
      categoriasList: [],
    };
  }

  async componentDidMount() {
    this.listagem();
  }

  listagem = async () => {
    const categoriasList = await getCategories();
    this.setState({
      categoriasList,
    });
  };

  render() {
    const {
      categoriasList,
    } = this.state;
    return (

      <main>
        <label htmlFor="pesquisa-inicial">
          <input
            id="pesquisa-inicial"
            placeholder="Pesquisa"
            name="pesquisa-inicial"
            type="text"
          />
        </label>

        <p
          data-testid="home-initial-message"
        >
          Digite algum termo de pesquisa ou escolha uma categoria.
        </p>
        <aside className="categorias-list">
          <h3>Categorias:</h3>
          {categoriasList.map(({ id, name }) => (
            <div key={ id }>
              <button
                type="button"
                data-testid="category"
                id={ id }
                onClick={ this.handleClick }
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

export default HomeInitialMessage;
