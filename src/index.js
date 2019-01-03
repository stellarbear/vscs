import React from 'react';
import ReactDOM from 'react-dom';
import App from './components/App';
import Redux from './components/basic/Redux';
import Router from './components/basic/Router';

ReactDOM.render(
	<Redux>
		<Router>
			<App />
		</Router>
	</Redux>,
	document.getElementById('root'),
);
