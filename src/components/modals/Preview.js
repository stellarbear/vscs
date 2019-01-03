import React from 'react';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import { connect } from 'react-redux';
import { notify } from '../../actions';
import history from '../basic/History';
import Modal from '../basic/Modal';

class ModalPreview extends React.Component {
	state = {
		json: '',
	}

	componentWillMount() {
		const { snippets } = this.props;
		const { list, selected } = snippets;
		const snippet = list[selected];

		if (Number.isNaN(selected) || snippet === undefined) {
			history.push('/editor');
			return;
		}

		const json = snippet.export();
		this.setState({ json });
	}

	onDismiss = () => {
		history.push('/editor');
	}

	handleCopyClick = (event) => {
		document.getElementById('preview-modal-textarea').select();
		document.execCommand('copy');

		event.target.focus();
		const { notify } = this.props;
		notify('Copied to clipboard.');
	}

	renderActions = () => (
		<>
			<Button id='preview-modal-copy-button' color='primary' onClick={this.handleCopyClick}>
				Copy to clipboard
			</Button>
		</>
	)

	renderContent = () => {
		const { json } = this.state;

		return (
			<TextField
				id='preview-modal-textarea'
				variant='filled'
				rowsMax='30'
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
				title='Snippet preview'
				content={this.renderContent()}
				actions={this.renderActions()}
				onDismiss={this.onDismiss}
			/>
		);
	}
}

const mapStateToProps = ({ snippets }) => ({ snippets });

export default connect(mapStateToProps, { notify })(ModalPreview);
