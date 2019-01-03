import actionTypes from './actionTypes';
import { notify } from './notification';
import history from '../components/basic/History';
import { Snippet } from '../Snippet';

const addSnippet = snippet => ({
	type: actionTypes.addSnippet,
	payload: { snippet },
});
const editSnippet = (propName, value) => ({
	type: actionTypes.editSnippet,
	payload: { propName, value },
});
const deleteSnippet = id => ({
	type: actionTypes.deleteSnippet,
	payload: { id },
});
const clearSnippets = () => ({
	type: actionTypes.clearSnippets,
	payload: null,
});

const importSnippets = json => (dispatch) => {
	try {
		const parsed = JSON.parse(json);

		history.push('/editor');
		dispatch(clearSnippets());
		Object.keys(parsed).forEach((key) => {
			const snippetJson = parsed[key];
			const snippet = new Snippet(key, snippetJson.prefix, snippetJson.description, snippetJson.body.join('\n'));
			snippet.parseBody();

			dispatch(addSnippet(snippet));
		});
	} catch (ex) {
		dispatch(notify('invalid format: expected json'));
	}
};

const selectSnippet = id => ({
	type: actionTypes.selectSnippet,
	payload: { id },
});

export {
	addSnippet, editSnippet, deleteSnippet, selectSnippet, clearSnippets, importSnippets,
};
