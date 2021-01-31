import React from 'react';
import { Provider } from 'react-redux';
import { createStore, applyMiddleware, compose } from 'redux';
import thunk from 'redux-thunk';
import { reducers } from '../../reducers';

export default ({ children, initialState = {} }) => {
	// eslint-disable-next-line no-underscore-dangle
	const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
	const store = createStore(
		reducers, initialState,
		composeEnhancers(applyMiddleware(thunk)),
	);

	return (
		<Provider store={store}>
			{children}
		</Provider>
	);
};
