import React, { Component } from 'react';

class HomeInitialMessage extends Component {
  render() {
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
      </main>
    );
  }
}

export default HomeInitialMessage;
