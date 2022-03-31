export const FETCH_CURRENCIES_SUCCESS = 'FETCH_CURRENCIES_SUCCESS';

const fetchCurrenciesSuccess = (currencies) => ({
  type: FETCH_CURRENCIES_SUCCESS,
  currencies,
});

const fetchCurrenciesFromAPI = async (dispatch) => {
  const URL = 'https://economia.awesomeapi.com.br/json/all';
  const response = await fetch(URL);
  const data = await response.json();
  const currencies = Object.keys(data).filter((key) => key !== 'USDT');
  dispatch(fetchCurrenciesSuccess(currencies));
};

export const fetchCurrenciesAction = () => fetchCurrenciesFromAPI;
