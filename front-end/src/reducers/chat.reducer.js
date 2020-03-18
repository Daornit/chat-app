import { chatConstants, userConstants } from '../constants';

export function chat(state = {}, action) {
  switch (action.type) {
    case chatConstants.LOAD_CHAT:
        state[action.userId] = state[action.userId] ? state[action.userId] : []
        return Object.assign({}, state);
    case chatConstants.DELETE_ALL_CHAT:
        delete state[action.userId];
        return Object.assign({}, state);
    case chatConstants.SEND_CHAT:
        state[action.payload.userId].push({ type: 'send', msg: action.payload.msg});
        return Object.assign({}, state);
    case chatConstants.RECEIVE_CHAT:
        state[action.payload.userId].push({ type: 'receive', msg: action.payload.msg});
        return Object.assign({}, state);
    case userConstants.LOGOUT:
        return {};
    default:
        return state
  }
}