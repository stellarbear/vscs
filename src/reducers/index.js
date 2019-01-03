import { combineReducers } from 'redux';
import { snippets, snippetsDefaultState } from './snippets';
import { notification, notificationDefaultState } from './notification';

const reducers = combineReducers({
	snippets,
	notification,
});

export {
	reducers, snippets, notification, snippetsDefaultState, notificationDefaultState,
};
