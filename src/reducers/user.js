import { USER_LOGIN } from '../actions/index';

const INITIAL_STATE = {
  email: '',
};

const user = (state = INITIAL_STATE, action) => {
  const { payload } = action;
  switch (action.type) {
  case USER_LOGIN:
    return { email: payload.email };
  default:
    return state;
  }
};

export default user;
