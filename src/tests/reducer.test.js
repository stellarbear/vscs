import { Snippet } from '../Snippet';
import { actionTypes } from '../actions';
import {
	snippets as snippetsReducer, notification as notificationReducer,
	snippetsDefaultState, notificationDefaultState,
} from '../reducers';

/*
notify
addSnippet
editSnippet
deleteSnippet
selectSnippet
clearSnippets
importSnippets
actionTypes
*/

describe('NOTIFICATION', () => {
	test('notify', () => {
		let state = { ...notificationDefaultState };

		const message = 'some text';
		state = notificationReducer(state, {
			type: actionTypes.notify,
			payload: { message },
		});

		expect(state).toMatchObject({ message });
	});
});


const defaultSnippet = Snippet.createDefault();
const customSnippet = new Snippet('n', 'p', 'd', 'b', ['#p']);
describe('SNIPPET', () => {
	beforeEach(() => {
		snippetsDefaultState.list = {};
	});

	test('addSnippet', () => {
		//  Default state
		let state = { ...snippetsDefaultState };
		expect(state).toMatchObject(snippetsDefaultState);

		//  Default snippet
		const snippet0 = defaultSnippet;
		state = snippetsReducer(state, {
			type: actionTypes.addSnippet,
			payload: { snippet: snippet0 },
		});

		//  Invalid payload
		const snippet1 = null;
		state = snippetsReducer(state, {
			type: actionTypes.addSnippet,
			payload: { snippet: snippet1 },
		});

		//  Custom snippet
		const snippet2 = customSnippet;
		state = snippetsReducer(state, {
			type: actionTypes.addSnippet,
			payload: { snippet: snippet2 },
		});

		expect(state).toMatchObject({
			list: { 0: snippet0, 1: snippet2 },

			guid: 2,
			selected: 0,
			isEmpty: false,
		});
	});

	test('clearSnippets', () => {
		let state = { ...snippetsDefaultState };
		state.isEmpty = false;
		state.selected = 2;
		state.guid = 4;
		state.list = { 1: customSnippet, 2: defaultSnippet, 3: defaultSnippet };

		//  Delete all
		state = snippetsReducer(state, {
			type: actionTypes.clearSnippets,
			payload: null,
		});

		expect(state).toMatchObject({ ...snippetsDefaultState });
	});


	test('deleteSnippet', () => {
		let state = { ...snippetsDefaultState };
		state.isEmpty = false;
		state.selected = 2;
		state.list = { 1: customSnippet, 2: defaultSnippet, 3: defaultSnippet };

		//  Delete non-existent snippet
		state = snippetsReducer(state, {
			type: actionTypes.deleteSnippet,
			payload: { id: 5 },
		});
		expect(state.selected).toEqual(2);
		expect(Object.keys(state.list)).toEqual(['1', '2', '3']);

		//  Delete selected snippet
		state = snippetsReducer(state, {
			type: actionTypes.deleteSnippet,
			payload: { id: 2 },
		});
		expect(state.selected).toEqual(1);
		expect(Object.keys(state.list)).toEqual(['1', '3']);

		//  Delete non-selected snippet
		state = snippetsReducer(state, {
			type: actionTypes.deleteSnippet,
			payload: { id: 3 },
		});
		expect(state.isEmpty).toBeFalsy();
		expect(state.selected).toEqual(1);
		expect(Object.keys(state.list)).toEqual(['1']);

		//  Delete all
		state = snippetsReducer(state, {
			type: actionTypes.deleteSnippet,
			payload: { id: 1 },
		});
		expect(state.isEmpty).toBeTruthy();
		expect(state.selected).toEqual(NaN);
		expect(Object.keys(state.list)).toEqual([]);
	});

	test('editSnippet', () => {
		let state = { ...snippetsDefaultState };
		state.selected = 1;
		state.list = { 1: customSnippet, 2: defaultSnippet };

		//  Edit placeholders
		expect(state.list[state.selected].placeholders).toEqual(['#p']);
		state = snippetsReducer(state, {
			type: actionTypes.editSnippet,
			payload: { propName: 'placeholders', value: ['#m', '#p'] },
		});
		expect(state.list[state.selected].placeholders).toEqual(['#m', '#p']);

		//  Edit other parts
		expect(state.list[state.selected].body).toEqual('b');
		state = snippetsReducer(state, {
			type: actionTypes.editSnippet,
			payload: { propName: 'body', value: 'm' },
		});
		expect(state.list[state.selected].body).toEqual('m');

		//  Edit non-existent
		state.selected = 2;
		expect(state.list[state.selected]).toEqual(defaultSnippet);
		state = snippetsReducer(state, {
			type: actionTypes.editSnippet,
			payload: { propName: 'invalid', value: null },
		});
		expect(state.list[state.selected]).toEqual(defaultSnippet);
	});

	test('moveSnippet', () => {
		let state = { ...snippetsDefaultState };
		state.selected = 2;
		state.list = { 1: customSnippet, 2: defaultSnippet };

		//  Move to non existent
		state = snippetsReducer(state, {
			type: actionTypes.moveSnippet,
			payload: { idFrom: 1, idTo: 5 },
		});
		expect(state).toEqual(state);

		//  Move from non existent
		state = snippetsReducer(state, {
			type: actionTypes.moveSnippet,
			payload: { idFrom: 5, idTo: 1 },
		});
		expect(state).toEqual(state);

		//  Normal movement procedure
		state = snippetsReducer(state, {
			type: actionTypes.moveSnippet,
			payload: { idFrom: 2, idTo: 1 },
		});
		expect(state.list[1]).toEqual(defaultSnippet);
		expect(state.list[2]).toEqual(customSnippet);
	});

	test('selectSnippet', () => {
		let state = { ...snippetsDefaultState };
		state.selected = 2;
		state.list = { 1: customSnippet, 2: defaultSnippet };

		//  Select non existent
		state = snippetsReducer(state, {
			type: actionTypes.selectSnippet,
			payload: { id: 5 },
		});
		expect(state.selected).toEqual(2);

		//  Select existent
		state = snippetsReducer(state, {
			type: actionTypes.selectSnippet,
			payload: { id: 1 },
		});
		expect(state.selected).toEqual(1);
	});
});
