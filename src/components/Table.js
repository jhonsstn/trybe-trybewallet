import PropTypes from 'prop-types';
import React, { Component } from 'react';
import { connect } from 'react-redux';

class Table extends Component {
  render() {
    const { expenses } = this.props;
    return (
      <table>
        <tbody>
          <tr>
            <th>Descrição</th>
            <th>Tag</th>
            <th>Método de pagamento</th>
            <th>Valor</th>
            <th>Moeda</th>
            <th>Câmbio utilizado</th>
            <th>Valor convertido</th>
            <th>Moeda de conversão</th>
            <th>Editar/Excluir</th>
          </tr>
          {expenses?.map((expense) => {
            const { value, currency, exchangeRates } = expense;
            const rate = exchangeRates[currency].ask;
            const currencyName = exchangeRates[currency].name;
            return (
              <tr key={ expense.id }>
                <td>{expense.description}</td>
                <td>{expense.tag}</td>
                <td>{expense.method}</td>
                <td>{parseFloat(value).toFixed(2)}</td>
                <td>{currencyName}</td>
                <td>{parseFloat(rate).toFixed(2)}</td>
                <td>{parseFloat(value * rate).toFixed(2)}</td>
                <td>Real</td>
                <td>Editar/Excluir</td>
              </tr>
            );
          })}
        </tbody>
      </table>
    );
  }
}

Table.propTypes = {
  expenses: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.number,
      value: PropTypes.string,
      description: PropTypes.string,
      currency: PropTypes.string,
      method: PropTypes.string,
      tag: PropTypes.string,
      exchangeRates: PropTypes.shape({
        USD: PropTypes.shape({
          code: PropTypes.string,
          codein: PropTypes.string,
          name: PropTypes.string,
          high: PropTypes.string,
          low: PropTypes.string,
          varBid: PropTypes.string,
          pctChange: PropTypes.string,
          bid: PropTypes.string,
          ask: PropTypes.string,
          timestamp: PropTypes.string,
          create_date: PropTypes.string,
        }),
      }),
    }),
  ).isRequired,
};

const mapStateToProps = (state) => ({
  expenses: state.wallet.expenses,
});

export default connect(mapStateToProps)(Table);
