import React from 'react';
import Grid from '@material-ui/core/Grid';
import BarEdit from '../bars/Edit';
import BarSnippet from '../bars/Snippet';
import BarPlaceholder from '../bars/Placeholder';

const Editor = () => (
	<Grid container spacing={16} alignItems='flex-start' justify='center'>
		<Grid item xs={12} md={4} lg={3}>
			<BarSnippet />
		</Grid>
		<Grid item xs={12} md={4} lg={4}>
			<BarEdit />
		</Grid>
		<Grid item xs={12} md={4} lg={3}>
			<BarPlaceholder />
		</Grid>
	</Grid>
);

export default Editor;
