import React from 'react';
import { connect } from 'react-redux';
import Grid from '@material-ui/core/Grid';
import Divider from '@material-ui/core/Divider';
import AddIcon from '@material-ui/icons/AddCircle';
import DeleteIcon from '@material-ui/icons/Delete';
import TextField from '@material-ui/core/TextField';

import Bar from './Bar';
import Button from '../basic/Button';

import { editSnippet, notify } from '../../actions';


const BarPlaceholder = (props) => {
	const editPlaceholders = (placeholders) => {
		props.editSnippet('placeholders', placeholders);
	};

	const handleDeletePlaceholderClick = (placeholder) => {
		const placeholders = props.selectedSnippet.placeholders.filter(el => el !== placeholder);
		editPlaceholders(placeholders);
	};

	const handlePlaceholderChange = (event, index) => {
		const { placeholders } = props.selectedSnippet;
		placeholders[index] = event.target.value;
		editPlaceholders(placeholders);
	};

	const renderPlaceholder = (placeholder, index) => (
		<TextField
			style={{ marginRight: 8, marginTop: 0 }}
			id={`placeholder-${index}-input`}
			margin='normal'
			variant='filled'

			label={`{${index + 1}:${placeholder}}`}

			fullWidth
			onChange={event => handlePlaceholderChange(event, index)}
			value={placeholder}
		/>
	);

	const renderFields = () => {
		const { isEmpty, selectedSnippet } = props;
		if (isEmpty) {
			return null;
		}

		return (
			<div style={{ marginTop: 16 }}>
				{selectedSnippet.placeholders.map((placeholder, index) => (
					<Grid container alignItems='center' key={index}>
						<Grid item xs>
							{renderPlaceholder(placeholder, index)}
						</Grid>
						<Grid item>
							{Button('DELETE', `placeholder-delete-${index}-button`, 'secondary', () => handleDeletePlaceholderClick(placeholder), <DeleteIcon />)}
						</Grid>
					</Grid>
				))}
			</div>
		);
	};

	const addPlaceholder = () => {
		const { selectedSnippet } = props;

		const placeholders = [...new Set([...selectedSnippet.placeholders, ''])];
		editPlaceholders(placeholders);
	};

	const renderButtons = () => {
		const { isEmpty } = props;

		return (
			<Grid container>
				{Button('ADD', 'placeholder-add-button', 'primary', addPlaceholder, <AddIcon />, isEmpty)}
				<Grid item xs />
				{Button('CLEAR ALL', 'placeholder-delete-all-button', 'secondary', () => editPlaceholders([]), <DeleteIcon />, isEmpty)}
			</Grid>
		);
	};

	return (
		<Bar header='PLACEHOLDERS'>
			{renderButtons()}
			<Divider />
			{renderFields()}
		</Bar>
	);
};


const mapStateToProps = ({ snippets }) => {
	const { list, isEmpty, selected } = snippets;
	const selectedSnippet = { ...list[selected] };

	return { selectedSnippet, isEmpty };
};

export default connect(mapStateToProps, { editSnippet, notify })(BarPlaceholder);
