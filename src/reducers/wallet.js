import { FETCH_CURRENCIES_SUCCESS } from '../actions/fetchCurrencies';
import { SAVE_EXPENSE } from '../actions/saveExpense';
import { DELETE_EXPENSE } from '../actions/deleteExpense';
import { UPDATE_EXPENSE } from '../actions/updateExpense';
import { SAVE_UPDATE } from '../actions/saveExpenseUpdate';

const INITIAL_STATE = {
  currencies: [],
  expenses: [],
  id: 0,
  isUpdating: false,
};

const wallet = (state = INITIAL_STATE, action) => {
  const { currencies, expense, exchangeRates, expenses, update } = action;
  switch (action.type) {
  case FETCH_CURRENCIES_SUCCESS:
    return { ...state, currencies };
  case SAVE_EXPENSE:
    return {
      ...state,
      expenses: [...state.expenses, { ...expense, exchangeRates }],
    };
  case DELETE_EXPENSE:
    return {
      ...state,
      expenses: [...expenses],
    };
  case UPDATE_EXPENSE:
    return {
      ...state,
      ...update,
    };
  case SAVE_UPDATE:
    return {
      ...state,
      expenses: [...expenses],
      update: { ...state.update, isUpdating: false },
    };
  default:
    return state;
  }
};

export default wallet;
