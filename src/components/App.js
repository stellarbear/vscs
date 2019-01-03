import React from 'react';
import { Route, Switch } from 'react-router-dom';
import { MuiThemeProvider, createMuiTheme } from '@material-ui/core/styles';
import blue from '@material-ui/core/colors/blue';
import red from '@material-ui/core/colors/red';
import Editor from './pages/Editor';
import ImportModal from './modals/Import';
import ExportModal from './modals/Export';
import PreviewModal from './modals/Preview';
import Notification from './Notification';
import BarNavigation from './Navigation';
import Main from './pages/Main';

const theme = createMuiTheme({
	palette: {
		primary: { main: blue[600] },
		secondary: { main: red[600] },
	},
	typography: { useNextVariants: true },
});

const App = () => (
	<MuiThemeProvider theme={theme}>
		<BarNavigation />
		<Switch>
			<Route path='/' exact component={Main} />
			<Route path='/editor' exact component={Editor} />
			<Route path='/editor/import' exact component={ImportModal} />
			<Route path='/editor/export' exact component={ExportModal} />
			<Route path='/editor/preview' exact component={PreviewModal} />
		</Switch>
		<Notification />
	</MuiThemeProvider>
);

export default App;
