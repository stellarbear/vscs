import { actionTypes } from '../actions';
import { Snippet } from '../Snippet';

const snippetsDefaultState = {
	list: {},

	guid: 0,
	selected: NaN,
	isEmpty: true,
};
const snippets = (state = { ...snippetsDefaultState }, action) => {
	let newState = state;

	switch (action.type) {
		case actionTypes.addSnippet: {
			if (!(action.payload.snippet instanceof Snippet)) return newState;

			newState.list[newState.guid] = action.payload.snippet;
			newState.isEmpty = false;
			newState.guid++;
			if (!newState.selected) {
				newState.selected = parseInt(Object.keys(newState.list)[0], 10);
			}

			return { ...newState };
		}
		case actionTypes.clearSnippets: {
			newState = { ...snippetsDefaultState };
			newState.list = {};
			return newState;
		}

		case actionTypes.deleteSnippet: {
			delete newState.list[action.payload.id];
			if (action.payload.id === newState.selected) {
				newState.selected = parseInt(Object.keys(newState.list)[0], 10);
			}
			if (Object.keys(newState.list).length === 0) {
				newState.isEmpty = true;
			}
			return { ...newState };
		}

		case actionTypes.editSnippet: {
			const { propName, value } = action.payload;
			newState.list[newState.selected].update({ [propName]: value });
			return { ...newState };
		}

		case actionTypes.moveSnippet: {
			const { idFrom, idTo } = action.payload;
			if (!Object.prototype.hasOwnProperty.call(newState.list, idFrom)
				|| !Object.prototype.hasOwnProperty.call(newState.list, idTo)) {
				return newState;
			}

			const tempSnippet = newState.list[idFrom];
			newState.list[idFrom] = newState.list[idTo];
			newState.list[idTo] = tempSnippet;

			return { ...newState };
		}

		case actionTypes.selectSnippet: {
			const { id } = action.payload;
			if (!newState.list[id]) {
				return newState;
			}

			newState.selected = id;
			return { ...newState };
		}


		default: {
			return newState;
		}
	}
};

export { snippets, snippetsDefaultState };
