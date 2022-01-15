import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { expensesLista, fetchCurrencies } from '../actions';
import formsPartTwo from '../helpers';
import TotalExpenses from './TotalExpenses';

class Forms extends React.Component {
  constructor() {
    super();
    this.state = {
      value: '',
      description: '',
      currency: 'USD',
      method: 'Dinheiro',
      tag: 'Alimentação',
      id: 0,
      exchangeRates: {},
    };

    this.handleOnChange = this.handleOnChange.bind(this);
    this.handleOnSubmit = this.handleOnSubmit.bind(this);
  }

  componentDidMount() {
    const { dispatch } = this.props;
    dispatch(fetchCurrencies());
  }

  currenciesCoins() {
    const { currencies } = this.props;

    return Object.keys(currencies).filter((currency) => currency !== 'USDT')
      .map(((currencyy) => (
        <option key={ currencyy } value={ currencyy }>{ currencyy }</option>
      )));
  }

  handleOnChange({ target }) {
    this.setState({
      [target.name]: target.value,
    });
  }

  handleOnSubmit(event) {
    event.preventDefault();
    const { dispatch, currencies } = this.props;

    dispatch(fetchCurrencies());

    this.setState({ exchangeRates: currencies }, () => {
      dispatch(expensesLista(this.state));
      this.setState((previousState) => ({
        id: previousState.id + 1,
        value: '',
        description: '' }));
    });
  }

  render() {
    const { currency, value } = this.state;
    return (
      <div>
        <form onSubmit={ this.handleOnSubmit }>
          <label htmlFor="value-input">
            { 'Valor: ' }
            <input
              data-testid="value-input"
              type="text"
              name="value"
              value={ value }
              onChange={ this.handleOnChange }
            />
          </label>
          <label htmlFor="description-input">
            { 'Description: ' }
            <input
              data-testid="description-input"
              type="text"
              name="description"
              onChange={ this.handleOnChange }
            />
          </label>
          <label htmlFor="currency-input">
            { 'Moeda: ' }
            <select
              id="currency-input"
              data-testid="currency-input"
              type="text"
              name="currency"
              value={ currency }
              onChange={ this.handleOnChange }
            >
              { this.currenciesCoins() }
            </select>
          </label>
          { formsPartTwo(this.handleOnChange) }
          <button
            type="submit"
          >
            Adicionar despesa
          </button>
        </form>
        <TotalExpenses />
      </div>
    );
  }
}

const mapStateToProps = (state) => ({
  currencies: state.wallet.currencies,
});

Forms.propTypes = ({
  currencies: PropTypes.objectOf(PropTypes.object).isRequired,
  dispatch: PropTypes.func.isRequired,
});

export default connect(mapStateToProps)(Forms);
