import React from 'react';
import IconButton from '@material-ui/core/IconButton';
import Tooltip from '@material-ui/core/Tooltip';
import Zoom from '@material-ui/core/Zoom';

export default (text, id, color, onClick, Icon, isDisabled = false) => (
	<Tooltip TransitionComponent={Zoom} title={text} style={{ fontSize: 40 }}>
		<div>
			<IconButton
  color={color}
  onClick={onClick}
  fontSize="small"
  disabled={isDisabled}
  id={id}
			>
				{Icon}
			</IconButton>
		</div>
	</Tooltip>
);
