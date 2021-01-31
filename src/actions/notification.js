import actionTypes from './actionTypes';

const notify = (message) => ({
	type: actionTypes.notify,
	payload: { message },
});

export { notify };
