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
import ImportIcon from '@material-ui/icons/Backup';
import TextField from '@material-ui/core/TextField';
import Typography from '@material-ui/core/Typography';
import CloneIcon from '@material-ui/icons/FilterNone';
import PreviewIcon from '@material-ui/icons/RemoveRedEye';
import ListItemText from '@material-ui/core/ListItemText';
import ListItemAvatar from '@material-ui/core/ListItemAvatar';

import history from '../basic/History';
import Button from '../basic/Button';
import Bar from './Bar';

import { Snippet } from '../../Snippet';
import { deleteSnippet, addSnippet, selectSnippet } from '../../actions';

class BarSnippet extends React.Component {
	state = {
		filterByName: '',
	}

	handleChange = (event) => {
		const { value, name } = event.target;
		this.setState({ [name]: value });
	}

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

	filterByNameCallback = (id) => {
		const { snippets } = this.props;
		const { filterByName } = this.state;

		return snippets.list[id].name.toUpperCase()
			.includes(filterByName.toUpperCase());
	}

	convertToIntCallback = id => parseInt(id, 10)

	renderFields = () => {
		const { snippets } = this.props;

		if (snippets.isEmpty) {
			return null;
		}

		return (
			<List>
				{Object.keys(snippets.list)
					.filter(this.filterByNameCallback)
					.map(this.convertToIntCallback)
					.map((id) => {
						const snippet = snippets.list[id];
						const isSelected = snippets.selected === id;

						const { selectSnippet } = this.props;

						return (
							<div key={id}>
								<Divider />
								<ListItem
									button
									className='snippet-entry'
									id={`snippet-${id}-entry`}
									selected={isSelected}

									onKeyDown={this.onKeyDown}
									onClick={() => selectSnippet(id)}
								>
									<ListItemAvatar>
										<Avatar>
											<Typography variant='caption'>
												{snippet.prefix}
											</Typography>
										</Avatar>
									</ListItemAvatar>
									<ListItemText
										primary={snippet.name}
										secondary={snippet.description}
									/>
								</ListItem>
							</div>
						);
					})}
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
				{Button('IMPORT', 'snippet-import-button', 'primary', () => history.push('/editor/import'), <ImportIcon />)}
				{Button('PREVIEW', 'snippet-preview-button', 'primary', () => history.push('/editor/preview'), <PreviewIcon />, isEmpty)}
				{Button('EXPORT', 'snippet-export-button', 'secondary', () => history.push('/editor/export'), <ExportIcon />, isEmpty)}
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

export default connect(mapStateToProps, { deleteSnippet, addSnippet, selectSnippet })(BarSnippet);
