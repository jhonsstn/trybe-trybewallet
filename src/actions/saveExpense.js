export const SAVE_EXPENSE = 'SAVE_EXPENSE';

const saveExpense = (expense, exchangeRates) => ({
  type: SAVE_EXPENSE,
  expense,
  exchangeRates,
});

export const saveExpensesAction = (state) => async function fetchExchangeRates(dispatch) {
  const URL = 'https://economia.awesomeapi.com.br/json/all';
  const response = await fetch(URL);
  const data = await response.json();
  dispatch(saveExpense(state, data));
};
