export const [SUCCESS_ACTION, FAIL_ACTION] = ['SUCCESS_ACTION', 'FAIL_ACTION'];

export const SUCCESS_LOGIN = 'SUCCESS_LOGIN';
export const SUCCESS_QUESTIONS = 'SUCCESS_QUESTIONS';
export const INCREMENT_SCORE = 'INCREMENT_SCORE';

export const loginAction = (payload) => ({
  type: SUCCESS_LOGIN,
  payload,
});

export const questionAction = (payload) => ({
  type: SUCCESS_QUESTIONS,
  payload,
});

export const scoreAction = (payload) => ({
  type: INCREMENT_SCORE,
  payload,
});
