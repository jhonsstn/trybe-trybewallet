import PropTypes from 'prop-types';
import React, { Component } from 'react';
import { connect } from 'react-redux';

class Header extends Component {
  reduceCallback = (acc, actual) => {
    const { currency, exchangeRates, value } = actual;
    const rate = exchangeRates[currency].ask;
    return acc + parseFloat(rate) * parseFloat(value);
  };

  render() {
    const { email, expenses } = this.props;
    return (
      <header>
        <div>
          <p data-testid="email-field">{email}</p>
          <p data-testid="total-field">
            {expenses?.reduce(this.reduceCallback, 0).toFixed(2)}
          </p>
          <span data-testid="header-currency-field">BRL</span>
        </div>
      </header>
    );
  }
}

Header.propTypes = {
  email: PropTypes.string.isRequired,
  expenses: PropTypes.arrayOf(
    PropTypes.shape({
      currency: PropTypes.string,
      exchangeRates: PropTypes.shape({
        ask: PropTypes.string,
      }),
    }),
  ).isRequired,
};

const mapStateToProps = (state) => ({
  email: state.user.email,
  expenses: state.wallet.expenses,
});

export default connect(mapStateToProps)(Header);
