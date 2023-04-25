import React, { Component } from 'react';
import PropTypes from 'prop-types';
import '../style/Checkout.css';

class Checkout extends Component {
  state = {
    fullName: '',
    email: '',
    cpf: '',
    phone: '',
    cep: '',
    address: '',
    payment: '',
    error: false,
    validation: '',
    shoppingCart: [],
  };

  componentDidMount() {
    const listShoppingCart = JSON.parse(localStorage.getItem('shoppingCart'));
    if (listShoppingCart !== null) {
      this.setState({ shoppingCart: listShoppingCart });
    }
  }

  validationForm = () => {
    const { fullName, email, cpf, phone, cep, address, payment } = this.state;
    const fullNameRegex = /^[a-zA-Z]+ [a-zA-Z]+$/;
    const numbers = /^[0-9]+$/;
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    const valTexts = fullNameRegex.test(fullName) && emailRegex.test(email);
    const valNumbers = numbers.test(cpf) && numbers.test(phone) && numbers.test(cep);
    const valAdressPayment = address !== '' && payment !== '';
    const validation = valAdressPayment && valNumbers && valTexts;
    this.setState({ validation });
  };

  onInputChange = ({ target }) => {
    const { name, value } = target;
    this.setState({ [name]: value }, this.validationForm);
  };

  submitForm = () => {
    const { validation } = this.state;
    if (validation) {
      localStorage.setItem('shoppingCart', []);
      const { history } = this.props;
      history.push('/');
    } else {
      this.setState({ error: true });
    }
  };

  render() {
    const { fullName, email, cpf, phone, cep, address, error, shoppingCart } = this.state;

    return (
      <div className="checkout-page">
        <section className="resume-products">
          <p>Revise seus pedidos</p>
          {shoppingCart.lenght > 0 ? (
            shoppingCart.map((item, index) => (
              <div key={ index }>
                <p data-testid="shopping-cart-product-name">{item.title}</p>
              </div>
            ))
          ) : (
            <p>Seu carrinho está vazio</p>
          )}
        </section>
        <section>
          <form className="form-pagamento">
            <p>Informações do comprador</p>
            <input
              type="text"
              name="fullName"
              value={ fullName }
              data-testid="checkout-fullname"
              placeholder="Nome completo"
              onChange={ this.onInputChange }
            />
            <input
              type="text"
              name="email"
              value={ email }
              data-testid="checkout-email"
              placeholder="Email"
              onChange={ this.onInputChange }
            />
            <input
              type="text"
              name="cpf"
              value={ cpf }
              data-testid="checkout-cpf"
              placeholder="CPF"
              onChange={ this.onInputChange }
            />
            <input
              type="text"
              name="phone"
              value={ phone }
              data-testid="checkout-phone"
              placeholder="Telefone"
              onChange={ this.onInputChange }
            />
            <input
              type="text"
              name="cep"
              value={ cep }
              data-testid="checkout-cep"
              placeholder="CEP"
              onChange={ this.onInputChange }
            />
            <input
              type="text"
              name="address"
              value={ address }
              data-testid="checkout-address"
              placeholder="Endereço"
              onChange={ this.onInputChange }
            />
            <div className="payment-container">
              <p>Método de pagamento</p>
              <input
                type="radio"
                id="boleto"
                name="payment"
                value="Boleto"
                data-testid="ticket-payment"
                onChange={ this.onInputChange }
              />
              <label htmlFor="Boleto">Boleto</label>

              <input
                type="radio"
                id="visa"
                name="payment"
                value="Visa"
                data-testid="visa-payment"
                onChange={ this.onInputChange }
              />
              <label htmlFor="visa">Visa</label>

              <input
                type="radio"
                id="MasterCard"
                name="payment"
                value="MasterCard"
                data-testid="master-payment"
                onChange={ this.onInputChange }
              />
              <label htmlFor="MasterCard">MasterCard</label>

              <input
                type="radio"
                id="Elo"
                name="payment"
                value="Elo"
                data-testid="elo-payment"
                onChange={ this.onInputChange }
              />
              <label htmlFor="Elo">Elo</label>
            </div>
            <button
              type="button"
              data-testid="checkout-btn"
              onClick={ this.submitForm }
            >
              Comprar
            </button>
            {error && <p data-testid="error-msg">Campos inválidos!</p>}
          </form>
        </section>

        {/*  PARA A PÁGINA DO SHOPPING CART <button type="button" data-testid="checkout-products" onClick={ ()=> (const { history } = this.props;
      history.push('/');)}> Finalizar compra </button> */}

      </div>
    );
  }
}
Checkout.propTypes = {
  history: PropTypes.shape({
    push: PropTypes.string,
  }).isRequired,
};

export default Checkout;
