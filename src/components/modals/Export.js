import React from 'react';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import { connect } from 'react-redux';
import { notify } from '../../actions';
import history from '../basic/History';
import Modal from '../basic/Modal';

class ModalExport extends React.Component {
	state = {
		json: '',
	}

	componentWillMount() {
		const { snippets } = this.props;
		const { list, isEmpty } = snippets;

		if (isEmpty) {
			return;
		}

		let json = '';
		Object.keys(list).forEach((id) => {
			json += `${list[id].export()},\n`;
		});

		json = `{\n\t${json.slice(0, ',\n'.length * -1).split('\n').join('\n\t')}\n}`;
		this.setState({ json });
	}

	onDismiss = () => history.push('/');

	handleCopyClick = (event) => {
		document.getElementById('export-modal-textarea').select();
		document.execCommand('copy');

		event.target.focus();
		const { notify } = this.props;
		notify('Copied to clipboard.');
	}

	renderActions = () => (
		<Button id='export-modal-copy-button' color='primary' onClick={this.handleCopyClick}>
			Export
		</Button>
	)

	renderContent = () => {
		const { json } = this.state;

		return (
			<TextField
				id='export-modal-textarea'
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

export default connect(mapStateToProps, { notify })(ModalExport);
