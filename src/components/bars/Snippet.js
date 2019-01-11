import React from 'react';
import { connect } from 'react-redux';
import Grid from '@material-ui/core/Grid';
import List from '@material-ui/core/List';
import Avatar from '@material-ui/core/Avatar';
import Divider from '@material-ui/core/Divider';
import ExportIcon from '@material-ui/icons/Save';
import ListItem from '@material-ui/core/ListItem';
import AddIcon from '@material-ui/icons/AddCircle';
import DeleteIcon from '@material-ui/icons/Delete';
import UpIcon from '@material-ui/icons/ArrowUpward';
import DownIcon from '@material-ui/icons/ArrowDownward';
import ImportIcon from '@material-ui/icons/Backup';
import TextField from '@material-ui/core/TextField';
import Typography from '@material-ui/core/Typography';
import CloneIcon from '@material-ui/icons/FilterNone';
import ListItemText from '@material-ui/core/ListItemText';
import ListItemAvatar from '@material-ui/core/ListItemAvatar';

import history from '../basic/History';
import Button from '../basic/Button';
import Bar from './Bar';

import { Snippet } from '../../Snippet';
import {
 deleteSnippet, addSnippet, selectSnippet, moveSnippet,
} from '../../actions';

const direction = {
	Up: 'UP',
	Down: 'DOWN',
};

class BarSnippet extends React.Component {
	state = {
		filterByName: '',
	}

	onSnippetMove = (moveDirection) => {
		const { moveSnippet, snippets } = this.props;
		const { list, selected } = snippets;

		const keys = Object.keys(list).filter(this.filterByNameCallback).map(this.convertToIntCallback);
		const index = keys.indexOf(parseInt(selected, 10));

		switch (moveDirection) {
			case direction.Up:
				if (index > 0) {
					moveSnippet(keys[index], keys[index - 1]);
				}
				break;

			case direction.Down:
				if (index < keys.length - 1) {
					moveSnippet(keys[index], keys[index + 1]);
				}
				break;
			default: break;
		}
	}

	handleChange = (event) => {
		const { value, name } = event.target;
		this.setState({ [name]: value });
	}

	filterByNameCallback = (id) => {
		const { snippets } = this.props;
		const { filterByName } = this.state;

		return snippets.list[id].name.toUpperCase()
			.includes(filterByName.toUpperCase());
	}

	convertToIntCallback = id => parseInt(id, 10)

	onKeyDown = (event) => {
		const UP = 38;
		const DOWN = 40;

		const { selectSnippet, snippets } = this.props;
		const { list, selected } = snippets;

		const keys = Object.keys(list).filter(this.filterByNameCallback).map(this.convertToIntCallback);
		const index = keys.indexOf(parseInt(selected, 10));

		switch (event.keyCode) {
			case UP:
				if (index > 0) {
					selectSnippet(keys[index - 1]);
				}
				break;

			case DOWN:
				if (index < keys.length - 1) {
					selectSnippet(keys[index + 1]);
				}
				break;
			default: break;
		}
	}

	shortenField = (field) => {
		if (field.length <= 4) {
			return field;
		}

		return `${field.slice(0, 4)}..`;
	}

	renderField = (id) => {
		const { snippets, selectSnippet } = this.props;
		const isSelected = snippets.selected === id;
		const snippet = snippets.list[id];

		return (
			<ListItem
				button
				selected={isSelected}
				className='snippet-entry'
				id={`snippet-${id}-entry`}
				onKeyDown={this.onKeyDown}
				onClick={() => selectSnippet(id)}
			>
				<ListItemAvatar>
					<Avatar>
						<Typography variant='caption'>
							{this.shortenField(snippet.prefix)}
						</Typography>
					</Avatar>
				</ListItemAvatar>
				<ListItemText
					primary={snippet.name}
					secondary={snippet.description}
				/>
			</ListItem>
		);
	}

	renderFields = () => {
		const { snippets } = this.props;

		if (snippets.isEmpty) {
			return null;
		}

		return (
			<List>
				{Object
					.keys(snippets.list)
					.filter(this.filterByNameCallback)
					.map(this.convertToIntCallback)
					.map(id => (
						<div key={id}>
							<Divider />
							{this.renderField(id)}
						</div>
					))}
			</List>
		);
	}

	renderNameFilterInput = () => {
		const { filterByName } = this.state;

		return (
			<TextField
				id='filter-name-input'
				name='filterByName'
				value={filterByName}
				onChange={this.handleChange}
				label='Search by name'
				style={{ marginRight: 8 }}
				fullWidth
				margin='normal'
				variant='filled'
			/>
		);
	}

	renderButtons = () => {
		const { snippets, addSnippet, deleteSnippet } = this.props;
		const { isEmpty, list, selected } = snippets;
		const snippet = list[selected];

		return (
			<Grid container>
				{Button('ADD', 'snippet-add-button', 'primary', () => addSnippet(Snippet.createDefault()), <AddIcon />)}
				{Button('CLONE', 'snippet-clone-button', 'secondary', () => addSnippet(snippet.clone()), <CloneIcon />, isEmpty)}
				{Button('DELETE', 'snippet-delete-button', 'secondary', () => deleteSnippet(selected), <DeleteIcon />, isEmpty)}
				<Grid item xs />
				{Button('MOVE UP', 'snippet-move-up-button', 'primary', () => this.onSnippetMove(direction.Up), <UpIcon />, isEmpty)}
				{Button('MOVE DOWN', 'snippet-move-down-button', 'primary', () => this.onSnippetMove(direction.Down), <DownIcon />, isEmpty)}
				{Button('IMPORT', 'snippet-import-button', 'primary', () => history.push('/import'), <ImportIcon />)}
				{Button('EXPORT', 'snippet-export-button', 'secondary', () => history.push('/export'), <ExportIcon />, isEmpty)}
			</Grid>
		);
	}

	render() {
		return (
			<Bar header='SNIPPETS'>
				{this.renderButtons()}
				<Divider />
				{this.renderNameFilterInput()}
				<Divider />
				{this.renderFields()}
			</Bar>
		);
	}
}

const mapStateToProps = ({ snippets }) => ({ snippets });

export default connect(mapStateToProps, {
 deleteSnippet, addSnippet, selectSnippet, moveSnippet,
})(BarSnippet);
