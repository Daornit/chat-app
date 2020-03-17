import { alertConstants } from '../constants';
import { store } from 'react-notifications-component';

export function alert(state = {}, action) {
  switch (action.type) {
    case alertConstants.SUCCESS:
      store.addNotification({
        message: action.message,
        type: 'success',
        insert: "top",
        container: "top-right",
        animationIn: ["animated", "fadeIn"],
        animationOut: ["animated", "fadeOut"],
        dismiss: {
          duration: 5000,
          onScreen: true
        }
      })
      return {
        type: 'alert-success',
        message: action.message,
      };
    case alertConstants.ERROR:
      store.addNotification({
        message: action.message,
        type: 'danger',
        insert: "top",
        container: "top-right",
        animationIn: ["animated", "fadeIn"],
        animationOut: ["animated", "fadeOut"],
        dismiss: {
          duration: 5000,
          onScreen: true
        }
      })
      return {
        type: 'alert-danger',
        message: action.message
      };
    case alertConstants.CLEAR:
      return {};
    default:
      return state
  }
}