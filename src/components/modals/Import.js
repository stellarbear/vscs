import React from 'react';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import { connect } from 'react-redux';
import { importSnippets } from '../../actions';
import history from '../basic/History';
import Modal from '../basic/Modal';


class ModalImport extends React.Component {
	state = {
		json: '',
	}

	onDismiss = () => {
		history.push('/');
	}

	handleTextChange = (event) => {
		this.setState({ json: event.target.value });
	}

	handleImport = () => {
		const { importSnippets } = this.props;
		const { json } = this.state;

		importSnippets(json);
	}

	renderActions = () => (
		<>
			<Button
				color='primary'
				onClick={() => this.handleImport()}
				id='import-modal-button'
			>
				Import
			</Button>
		</>
	)

	renderContent = () => {
		const { json } = this.state;

		return (
			<TextField
				id='import-modal-textarea'
				variant='filled'
				rowsMax='30'
				onChange={this.handleTextChange}
				autoFocus
				multiline
				margin='dense'
				label='snippet.json'
				fullWidth
				spellCheck={false}
				autoComplete='off'
				value={json}
			/>
		);
	}


	render() {
		return (
			<Modal
				title='Import your *.json snippet'
				content={this.renderContent()}
				actions={this.renderActions()}
				onDismiss={this.onDismiss}
			/>
		);
	}
}

export default connect(null, { importSnippets })(ModalImport);
