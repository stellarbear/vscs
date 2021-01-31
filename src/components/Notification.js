import React from 'react';
import Snackbar from '@material-ui/core/Snackbar';
import Fade from '@material-ui/core/Fade';
import { connect } from 'react-redux';
import IconButton from '@material-ui/core/IconButton';
import CloseIcon from '@material-ui/icons/Close';

class Notification extends React.Component {
	constructor() {
		super();
		this.state = {
			open: false,
			message: '',
		};
	}

	UNSAFE_componentWillReceiveProps(props) {
		this.setState({
			...props.notification, open: true,
		});
	}

	handleClose = () => {
		this.setState({ open: false });
	};

	render() {
		const { handleClose, state: { open, message } } = this;
		return (
			<div>
				<Snackbar
					anchorOrigin={{ vertical: 'bottom', horizontal: 'left' }}
					open={open}
					message={message}
					onClose={handleClose}
					TransitionComponent={Fade}
					action={(
						<IconButton
							key='close'
							aria-label='Close'
							color='inherit'
							onClick={this.handleClose}
						>
							<CloseIcon />
						</IconButton>
					)}
				/>
			</div>
		);
	}
}

const mapStateToProps = ({ notification }) => ({ notification });

export default connect(mapStateToProps)(Notification);
