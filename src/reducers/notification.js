import { actionTypes } from '../actions';

const notificationDefaultState = {
	message: '',
};
const notification = (state = notificationDefaultState, action) => {
	switch (action.type) {
	case actionTypes.notify:
		return action.payload;
	default:
		return state;
	}
};

export { notification, notificationDefaultState };
