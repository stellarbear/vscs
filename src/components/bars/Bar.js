import React from 'react';
import Paper from '@material-ui/core/Paper';
import Typography from '@material-ui/core/Typography';
import { Divider } from '@material-ui/core';

const style = {
	padding: 10,
	marginTop: 8,
};

const Bar = ({ header, children }) => (
	<Paper style={style}>
		<Typography color="primary" align="center" variant="h5">{header}</Typography>
		<Divider />
		{children}
	</Paper>
);

export default Bar;
