import { Types } from '../constants/actionTypes'
// '../constants/actionTypes';

export const ActionCreators = {

  login: (user) => ({ type: Types.LOGIN, payload: { user } }),

  register: (user) => ({ type: Types.REGISTER, payload: { user } })
}