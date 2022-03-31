import { FETCH_CURRENCIES_SUCCESS } from '../actions/fetchCurrencies';

const INITIAL_STATE = {
  currencies: [],
  expenses: [],
};

const wallet = (state = INITIAL_STATE, action) => {
  const { currencies } = action;
  switch (action.type) {
  case FETCH_CURRENCIES_SUCCESS:
    return { ...state, currencies };
  default:
    return state;
  }
};

export default wallet;
