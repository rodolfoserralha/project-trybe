// Coloque aqui suas actions

const USER_LOGIN = 'USER_LOGIN';
const GENERATE_EXPENSE = 'GENERATE_EXPENSE';
const FETCH_SUCCESS = 'FETCH_SUCCESS';
const FETCH_ERROR = 'FETCH_ERROR';
const CURRENCY_COINS = 'CURRENCY_COINS';
const EXPENSES_LIST = 'EXPENSES_LIST';
const EXPENSES_EXCHANGE_RATES = 'EXPENSES_EXCHANGE_RATES';
const DELETE_EXPENSE = 'DELETE_EXPENSE';

export const userLog = (payload) => ({
  type: USER_LOGIN,
  payload,
});

export const walletLog = (payload) => ({
  type: GENERATE_EXPENSE,
  payload,
});

export const currencyCoins = (payload) => ({
  type: CURRENCY_COINS,
  payload,
});

export const fetchSuccess = (payload) => ({
  type: FETCH_SUCCESS,
  payload,
});

export const fetchError = (payload) => ({
  type: FETCH_ERROR,
  payload,
});

export const expensesList = (payload) => ({
  type: EXPENSES_LIST,
  payload,
});

export const expensesExchange = (payload) => ({
  type: EXPENSES_EXCHANGE_RATES,
  payload,
});

export const deleteExpense = (id) => (dispatch) => {
  dispatch({
    type: DELETE_EXPENSE,
    id,
  });
};

export function fetchCurrencies() {
  return (dispatch) => {
    fetch('https://economia.awesomeapi.com.br/json/all')
      .then((response) => response.json())
      .then((currency) => dispatch(fetchSuccess(currency)))
      .catch((error) => dispatch(fetchError(error)));
  };
}

export function expensesLista(payload) {
  return (dispatch) => dispatch(expensesList(payload));
}
