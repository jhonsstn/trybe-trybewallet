import { FETCH_CURRENCIES_SUCCESS } from '../actions/fetchCurrencies';
import { SAVE_EXPENSE } from '../actions/saveExpense';

const INITIAL_STATE = {
  currencies: [],
  expenses: [],
};

const wallet = (state = INITIAL_STATE, action) => {
  const { currencies, expense, exchangeRates } = action;
  switch (action.type) {
  case FETCH_CURRENCIES_SUCCESS:
    return { ...state, currencies };
  case SAVE_EXPENSE:
    return {
      ...state,
      expenses: [...state.expenses, { ...expense, exchangeRates }],
    };
  default:
    return state;
  }
};

export default wallet;
