import '@babel/polyfill';
import { userConstants } from '../_constants';

export function user(state = {username : '', password: ''}, action) {
  switch (action.type) {
    case userConstants.UPDATE_USERNAME_FIELD:
      return Object.assign({}, state, {
        username: action.payload.username
      });
    case userConstants.UPDATE_PASSWORD_FIELD:
      return Object.assign({}, state, {
        password: action.payload.password
      });
    case userConstants.LOGOUT:
      return Object.assign({
        username: '',
        password: ''
      });
    case userConstants.FAILED_LOGIN:
      return Object.assign({
        username: '',
        password: '',
        error: action.payload.error
      });
    default:
      return state
  }
}