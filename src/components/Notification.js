import React from 'react';
import Snackbar from '@material-ui/core/Snackbar';
import Fade from '@material-ui/core/Fade';
import { connect } from 'react-redux';
import IconButton from '@material-ui/core/IconButton';
import CloseIcon from '@material-ui/icons/Close';

class Notification extends React.Component {
	state = {
		open: false,
		message: '',
	};

	static getDerivedStateFromProps(props) {
		return {
			...props.notification, open: true,
		};
	}

	handleClick = () => {
		this.setState({ open: true });
	};

	handleClose = () => {
		this.setState({ open: false });
	};

	render() {
		return (
			<div>
				<Snackbar
					anchorOrigin={{ vertical: 'bottom', horizontal: 'left' }}
					{...this.state}
					onClose={this.handleClose}
					TransitionComponent={Fade}
					action={(
						<IconButton
							key="close"
							aria-label="Close"
							color="inherit"
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
