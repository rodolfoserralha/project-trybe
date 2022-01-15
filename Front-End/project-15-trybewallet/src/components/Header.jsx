import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

class Header extends React.Component {
  getTotalValue() {
    const { expenses } = this.props;

    const TOTAL_VALUE = Number(expenses
      .reduce((acc, cur) => acc + (cur.value * cur.exchangeRates[cur.currency].ask), 0));

    return TOTAL_VALUE.toFixed(2);
  }

  render() {
    const { email } = this.props;
    return (
      <header className="header-texts">
        <p data-testid="email-field">{ email }</p>
        <p data-testid="total-field">{ this.getTotalValue() }</p>
        <p data-testid="header-currency-field">BRL</p>
      </header>
    );
  }
}

const mapStateToProps = (state) => ({
  email: state.user.email,
  expenses: state.wallet.expenses,
});

Header.propTypes = {
  email: PropTypes.string.isRequired,
  expenses: PropTypes.arrayOf(PropTypes.object).isRequired,
};

export default connect(mapStateToProps, null)(Header);
