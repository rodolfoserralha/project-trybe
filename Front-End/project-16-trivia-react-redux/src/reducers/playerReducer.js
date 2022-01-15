import {
  SUCCESS_LOGIN,
  SUCCESS_QUESTIONS,
  INCREMENT_SCORE,
} from '../actions';

const initialState = {
  name: '',
  assertions: 0,
  score: 0,
  token: '',
  gravatarEmail: '',
  questions: [],
};

export default (state = initialState, { type, payload }) => {
  switch (type) {
  case SUCCESS_LOGIN:
    return { ...initialState, ...payload };
  case SUCCESS_QUESTIONS:
    return { ...state, questions: payload };
  default:
    return state;
  case INCREMENT_SCORE:
    return { ...state, score: state.score + payload, assertions: state.assertions + 1 };
  }
};
