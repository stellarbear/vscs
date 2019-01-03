import React from 'react';
import { Router } from 'react-router-dom';
import history from './History';

export default ({ children }) => (
	<Router history={history}>
		{children}
	</Router>
);
