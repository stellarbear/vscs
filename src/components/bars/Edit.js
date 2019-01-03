import React from 'react';
import { connect } from 'react-redux';

import TextField from '@material-ui/core/TextField';

import Bar from './Bar';
import { editSnippet, addSnippet, deleteSnippet } from '../../actions';

const BarEdit = (props) => {
	const handleChange = (event) => {
		const { value, name } = event.target;
		const { editSnippet } = props;
		editSnippet(name, value);
	};

	const renderInputField = (name, helperText = '', isMultiLine = false) => {
		const { selectedSnippet } = props;
		const value = selectedSnippet[name];

		return (
			<TextField
				style={{ marginRight: 8, marginTop: 0 }}
				margin='normal'
				variant='filled'
				autoComplete='off'

				id={`snippet-${name}-input`}
				helperText={helperText}
				label={name}

				fullWidth
				onChange={handleChange}
				value={value}
				name={name}

				multiline={isMultiLine}
			/>
		);
	};

	const renderInputFields = () => {
		const { isEmpty } = props;
		if (isEmpty) {
			return null;
		}

		return (
			<div style={{ marginTop: 16 }}>
				{renderInputField('name')}
				{renderInputField('prefix')}
				{renderInputField('description')}
				{renderInputField('body', '', true)}
			</div>
		);
	};

	return (
		<Bar header='EDITOR'>
			{renderInputFields()}
		</Bar>
	);
};

const mapStateToProps = ({ snippets }) => {
	const { list, selected, isEmpty } = snippets;
	const selectedSnippet = { ...list[selected] };

	return { selectedSnippet, isEmpty };
};

export default connect(mapStateToProps, { editSnippet, addSnippet, deleteSnippet })(BarEdit);
