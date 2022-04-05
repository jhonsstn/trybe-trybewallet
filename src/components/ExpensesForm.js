import PropTypes from 'prop-types';
import React from 'react';
import { connect } from 'react-redux';
import { fetchCurrenciesAction } from '../actions/fetchCurrencies';
import { saveExpensesAction } from '../actions/saveExpense';
import { saveExpenseUpdateAction } from '../actions/saveExpenseUpdate';

class ExpensesForm extends React.Component {
  constructor() {
    super();

    this.state = {
      id: 0,
      value: '',
      currency: 'USD',
      method: 'Dinheiro',
      tag: 'Alimentação',
      description: '',
    };
  }

  componentDidMount() {
    const { getCurrencies } = this.props;
    getCurrencies();
  }

  handleSubmit = () => {
    const { saveExpense } = this.props;
    saveExpense(this.state);
    this.resetValue();
  };

  handleUpdate = () => {
    const { value, currency, method, tag, description } = this.state;
    const { updateId, expenses, updateExpense } = this.props;
    const objectIndex = expenses.findIndex((object) => object.id === updateId);
    expenses[objectIndex] = {
      ...expenses[objectIndex],
      value,
      currency,
      method,
      tag,
      description,
    };
    updateExpense(expenses);
    this.resetValue();
  };

  resetValue = () => {
    this.setState((prevState) => ({
      id: prevState.id + 1,
      value: '',
      description: '',
    }));
  };

  handleChange = ({ target }) => {
    const { name, value } = target;
    this.setState({
      [name]: value,
    });
  };

  render() {
    const { value, currency, method, tag, description } = this.state;
    const { currencies, isUpdating } = this.props;
    return (
      <form>
        <label htmlFor="value">
          Valor
          <input
            data-testid="value-input"
            type="number"
            id="value"
            name="value"
            value={ value }
            onChange={ this.handleChange }
          />
        </label>
        <label htmlFor="currency">
          Moeda
          <select
            data-testid="currency-input"
            id="currency"
            name="currency"
            value={ currency }
            onChange={ this.handleChange }
          >
            {currencies.map((currencyId) => (
              <option key={ currencyId } value={ currencyId }>
                {currencyId}
              </option>
            ))}
          </select>
        </label>
        <label htmlFor="method">
          Método de pagamento
          <select
            data-testid="method-input"
            id="method"
            name="method"
            value={ method }
            onChange={ this.handleChange }
          >
            <option value="Dinheiro">Dinheiro</option>
            <option value="Cartão de crédito">Cartão de crédito</option>
            <option value="Cartão de débito">Cartão de débito</option>
          </select>
        </label>
        <label htmlFor="tag">
          Categoria
          <select
            data-testid="tag-input"
            id="tag"
            name="tag"
            value={ tag }
            onChange={ this.handleChange }
          >
            <option value="Alimentação">Alimentação</option>
            <option value="Lazer">Lazer</option>
            <option value="Trabalho">Trabalho</option>
            <option value="Transporte">Transporte</option>
            <option value="Saúde">Saúde</option>
          </select>
        </label>
        <label htmlFor="description">
          Descrição
          <input
            data-testid="description-input"
            type="text"
            id="description"
            name="description"
            value={ description }
            onChange={ this.handleChange }
          />
        </label>
        {isUpdating ? (
          <input
            type="button"
            value="Editar despesa"
            onClick={ this.handleUpdate }
          />
        ) : (
          <input
            type="button"
            value="Adicionar despesa"
            onClick={ this.handleSubmit }
          />
        )}
      </form>
    );
  }
}

ExpensesForm.propTypes = {
  currencies: PropTypes.arrayOf(PropTypes.string).isRequired,
  expenses: PropTypes.arrayOf(PropTypes.shape({})).isRequired,
  getCurrencies: PropTypes.func.isRequired,
  isUpdating: PropTypes.bool,
  saveExpense: PropTypes.func.isRequired,
  updateExpense: PropTypes.func.isRequired,
  updateId: PropTypes.number,
};

ExpensesForm.defaultProps = {
  isUpdating: false,
  updateId: 0,
};

const mapDispatchToProps = (dispatch) => ({
  getCurrencies: () => dispatch(fetchCurrenciesAction()),
  saveExpense: (state) => dispatch(saveExpensesAction(state)),
  updateExpense: (expenses) => dispatch(saveExpenseUpdateAction(expenses)),
});

const mapStateToProps = (state) => ({
  currencies: state.wallet.currencies,
  expenses: state.wallet.expenses,
  isUpdating: state.wallet.isUpdating,
  updateId: state.wallet.id,
});

export default connect(mapStateToProps, mapDispatchToProps)(ExpensesForm);
