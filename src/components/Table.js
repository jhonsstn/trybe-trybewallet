import PropTypes from 'prop-types';
import React, { Component } from 'react';
import { connect } from 'react-redux';
import { deleteExpenseAction } from '../actions/deleteExpense';
import { updateExpenseAction } from '../actions/updateExpense';

class Table extends Component {
  handleDelete = (id) => {
    const { expenses, deleteExpense } = this.props;
    const result = expenses.filter((expense) => expense.id !== id);
    deleteExpense(result);
  };

  handleUpdate = (id) => {
    const { updateExpense } = this.props;
    const result = {
      id,
      isUpdating: true,
    };
    updateExpense(result);
  };

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
            const { value, currency, exchangeRates, id } = expense;
            const rate = exchangeRates[currency].ask;
            const currencyName = exchangeRates[currency].name;
            return (
              <tr key={ id }>
                <td>{expense.description}</td>
                <td>{expense.tag}</td>
                <td>{expense.method}</td>
                <td>{parseFloat(value).toFixed(2)}</td>
                <td>{currencyName}</td>
                <td>{parseFloat(rate).toFixed(2)}</td>
                <td>{parseFloat(value * rate).toFixed(2)}</td>
                <td>Real</td>
                <td>
                  <input
                    data-testid="edit-btn"
                    type="button"
                    value="Editar"
                    onClick={ () => this.handleUpdate(id) }
                  />
                  <input
                    data-testid="delete-btn"
                    type="button"
                    value="Excluir"
                    onClick={ () => this.handleDelete(id) }
                  />
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>
    );
  }
}

Table.propTypes = {
  deleteExpense: PropTypes.func.isRequired,
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
  updateExpense: PropTypes.func.isRequired,
};

const mapStateToProps = (state) => ({
  expenses: state.wallet.expenses,
});

const mapDispatchToProps = (dispatch) => ({
  deleteExpense: (state) => dispatch(deleteExpenseAction(state)),
  updateExpense: (state) => dispatch(updateExpenseAction(state)),
});

export default connect(mapStateToProps, mapDispatchToProps)(Table);
