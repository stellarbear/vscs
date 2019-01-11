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
const selectSnippet = id => ({
	type: actionTypes.selectSnippet,
	payload: { id },
});

const moveSnippet = (idFrom, idTo) => (dispatch) => {
	dispatch({
		type: actionTypes.moveSnippet,
		payload: { idFrom, idTo },
	});

	dispatch(selectSnippet(idTo));
};

const importSnippets = json => (dispatch) => {
	try {
		const parsed = JSON.parse(json);

		history.push('/');
		dispatch(clearSnippets());
		Object.keys(parsed).forEach((key) => {
			const snippetJson = parsed[key];
			const snippet = new Snippet(key, snippetJson.prefix, snippetJson.description, snippetJson.body.join('\n'));
			snippet.parseBody();

			dispatch(addSnippet(snippet));
		});
	} catch (ex) {
		dispatch(notify(`invalid format: expected json. ${ex.message}`));
	}
};

export {
	addSnippet, editSnippet, deleteSnippet, selectSnippet, clearSnippets, importSnippets, moveSnippet,
};
