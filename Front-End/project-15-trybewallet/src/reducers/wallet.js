const INITIAL_STATE = {
  currencies: {},
  expenses: [],
};

export default function wallet(state = INITIAL_STATE, action) {
  switch (action.type) {
  case 'FETCH_SUCCESS':
    return {
      ...state,
      currencies: action.payload,
      error: null,
    };

  case 'FETCH_ERROR':
    return {
      ...state,
      error: action.payload,
    };

  case 'EXPENSES_LIST':
    return {
      ...state,
      expenses: [...state.expenses, action.payload],
    };

  case 'DELETE_EXPENSE':
    return {
      ...state,
      expenses: state.expenses.filter(({ id }) => id !== action.id),
    };

  default:
    return state;
  }
}
