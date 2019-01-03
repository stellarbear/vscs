import React from 'react';
import ReactDOM from 'react-dom';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogTitle from '@material-ui/core/DialogTitle';
import Button from '@material-ui/core/Button';

class Modal extends React.Component {
	renderActions = (actions, onDismiss) => (
		<>
			{actions}
			<Button color="secondary" onClick={onDismiss} id="dismiss-modal-button"> Cancel</Button>
		</>
	)

	render() {
		const {
			title, content, actions, onDismiss,
		} = this.props;
		return ReactDOM.createPortal(
			<Dialog
  fullWidth
  open
  scroll="paper"
  onClose={onDismiss}
			>
				<DialogTitle>{title}</DialogTitle>
				<DialogContent>{content}</DialogContent>
				<DialogActions>{this.renderActions(actions, onDismiss)}</DialogActions>
			</Dialog>,
			//  For testing purposes
			document.getElementById('modal') || document.createElement('div'),
		);
	}
}

export default Modal;
