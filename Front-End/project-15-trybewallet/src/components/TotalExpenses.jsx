import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { deleteExpense } from '../actions';

class TotalExpenses extends React.Component {
  constructor() {
    super();

    this.numberToFixed = this.numberToFixed.bind(this);
  }

  tableDescription() {
    return (
      <>
        <th>Descrição</th>
        <th>Tag</th>
        <th>Método de pagamento</th>
        <th>Valor</th>
        <th>Moeda</th>
        <th>Câmbio utilizado</th>
        <th>Valor convertido</th>
        <th>Moeda de conversão</th>
        <th>Editar/Excluir</th>
      </>
    );
  }

  numberToFixed(number) {
    return `${Number(number).toFixed(2)}`;
  }

  render() {
    const { expenses, dispatchDelete } = this.props;
    return (
      <div>
        <h1>WalletTable</h1>
        <table>
          <thead>
            <tr>
              { this.tableDescription() }
            </tr>
          </thead>

          <tbody>
            { expenses.map(({
              currency,
              description,
              id,
              method,
              tag,
              value,
              exchangeRates,
            }) => (
              <tr
                key={ id }
              >
                <td>{description}</td>
                <td>{tag}</td>
                <td>{method}</td>
                <td>{value}</td>
                <td>{ exchangeRates[currency].name.split('/')[0] }</td>
                <td>{ this.numberToFixed(exchangeRates[currency].ask) }</td>
                <td>{ (exchangeRates[currency].ask * value).toFixed(2) }</td>
                <td>Real</td>
                <td>
                  <button
                    type="button"
                    data-testid="delete-btn"
                    onClick={ () => dispatchDelete(id) }
                  >
                    Apagar
                  </button>
                </td>
              </tr>
            )) }
          </tbody>
        </table>
      </div>
    );
  }
}

const mapStateToProps = (state) => ({
  expenses: state.wallet.expenses,
});

const mapDispatchToProps = (dispatch) => ({
  dispatchDelete: (id) => dispatch(deleteExpense(id)),
});

TotalExpenses.propTypes = {
  expenses: PropTypes.arrayOf(PropTypes.object).isRequired,
  dispatchDelete: PropTypes.func.isRequired,
};

export default connect(mapStateToProps, mapDispatchToProps)(TotalExpenses);
