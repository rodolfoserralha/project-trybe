import React from 'react';
import { connect } from 'react-redux';
import Forms from '../components/FormsOne';
import Header from '../components/Header';

class Wallet extends React.Component {
  render() {
    return (
      <div className="wallet">
        <Header />
        <Forms />
      </div>
    );
  }
}

const mapStateToProps = (state) => ({
  wallet: { expenses: state.wallet.expenses },
});

export default connect(mapStateToProps, null)(Wallet);
