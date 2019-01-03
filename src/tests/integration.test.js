import React from 'react';
import { mount } from 'enzyme';
import thunk from 'redux-thunk';
import { Provider } from 'react-redux';
import { createStore, applyMiddleware } from 'redux';

import { Snippet } from '../Snippet';
import { reducers } from '../reducers';

import App from '../components/App';
import Router from '../components/basic/Router';


let app;
const initialState = {};
const store = createStore(
	reducers, initialState,
	applyMiddleware(thunk),
);

beforeAll(() => {
	app = mount(
		<Provider store={store}>
			<Router>
				<App />
			</Router>
		</Provider>,
	);

	//  Navigate to editor
	app.find('button#editor-button').simulate('click');
	app.update();
});

describe('SNIPPETS', () => {
	test('add a snippet', () => {
		app.find('button#snippet-add-button').simulate('click');
		app.update();

		//  Confirm that snippet is added to GUI
		expect(app.find('div.snippet-entry').length).toEqual(1);

		//  Verify changes in the store
		const { list, selected } = store.getState().snippets;
		expect(list[selected].compareTo(Snippet.createDefault())).toEqual(true);
	});

	test('change snippet', () => {
		const name = 'new snippet name';
		const body = 'new snippet body';
		const prefix = 'new snippet prefix';
		const description = 'new snippet description';

		//  Update all text inputs (do not forget about passing name to event)
		app.find('input#snippet-name-input').simulate('change', { target: { name: 'name', value: name } });
		app.find('textarea#snippet-body-input').simulate('change', { target: { name: 'body', value: body } });
		app.find('input#snippet-prefix-input').simulate('change', { target: { name: 'prefix', value: prefix } });
		app.find('input#snippet-description-input').simulate('change', { target: { name: 'description', value: description } });
		app.update();

		//  Verify changes in the store
		const { list, selected } = store.getState().snippets;
		expect(list[selected].compareTo(new Snippet(name, prefix, description, body))).toEqual(true);
	});

	test('change selected snippet by click', () => {
		//  Check if 0 is selected
		let { selected } = store.getState().snippets;
		expect(selected).toEqual(0);

		//  Add additional snippet
		app.find('button#snippet-add-button').simulate('click');
		app.update();

		//  Select newly created snippet
		app.find('div#snippet-1-entry').simulate('click');
		app.update();

		//  Check if 1 is selected
		({ selected } = store.getState().snippets);
		expect(selected).toEqual(1);
	});

	test('clone snippet', () => {
		// Clone 1 (unmodified) snippet
		//  0 - modified
		//  1 - default
		//  2 - default
		app.find('button#snippet-clone-button').simulate('click');
		app.update();

		//  Select 0 (modified snippet)
		app.find('div#snippet-0-entry').simulate('click');
		app.update();

		//  Clone 0 (modified snippet)
		//  0 - modified
		//  1 - default
		//  2 - default
		//  3 - modified
		app.find('button#snippet-clone-button').simulate('click');
		app.update();

		//  Verify changes in the store
		const { list } = store.getState().snippets;
		expect(list[1].compareTo(list[2])).toEqual(true);
		expect(list[0].compareTo(list[3])).toEqual(true);
	});

	test('filter snippet by name', () => {
		//  Add one more snippet (clone)
		//  0 - modified
		//  1 - default
		//  2 - default
		//  3 - modified
		//  4 - modified
		app.find('button#snippet-clone-button').simulate('click');
		app.update();

		//  Confirm that 4 snippets are present at GUI
		expect(app.find('div.snippet-entry').length).toEqual(5);

		//  Filter snippets
		app.find('input#filter-name-input').simulate('change', { target: { name: 'filterByName', value: 'new' } });
		app.update();

		//  Confirm that 3 snippets are present at GUI
		//  0 - modified
		//  3 - modified
		//  4 - modified
		expect(app.find('div.snippet-entry').length).toEqual(3);
	});

	test('change selected snippet by key down', () => {
		const UP = 38;
		const DOWN = 40;

		//  Select 3 snippet
		//  0 - modified
		//  + 3 - modified
		//  4 - modified
		app.find('div#snippet-0-entry').simulate('click');
		app.update();

		//  Verify that 3 is selected
		let { selected } = store.getState().snippets;
		expect(selected).toEqual(0);

		//  Go up
		//  + 0 - modified
		//  3 - modified
		//  4 - modified
		app.find('div#snippet-3-entry').simulate('keydown', { keyCode: UP });
		app.update();

		//  Verify that 0 is selected
		({ selected } = store.getState().snippets);
		expect(selected).toEqual(0);

		//  Go up
		//  + 0 - modified
		//  3 - modified
		//  4 - modified
		app.find('div#snippet-0-entry').simulate('keydown', { keyCode: UP });
		app.update();

		//  Verify that 0 is not decremented to -1
		({ selected } = store.getState().snippets);
		expect(selected).toEqual(0);

		//  Go down
		//  0 - modified
		//  3 - modified
		//  + 4 - modified
		app.find('div#snippet-0-entry').simulate('keydown', { keyCode: DOWN });
		app.find('div#snippet-3-entry').simulate('keydown', { keyCode: DOWN });
		app.update();

		//  Verify that 4 is selected
		({ selected } = store.getState().snippets);
		expect(selected).toEqual(4);

		//  Go down
		//  0 - modified
		//  3 - modified
		//  + 4 - modified
		app.find('div#snippet-4-entry').simulate('keydown', { keyCode: DOWN });
		app.update();

		//  Verify that 4 is not overflowed to 5
		({ selected } = store.getState().snippets);
		expect(selected).toEqual(4);
	});

	test('delete snippet', () => {
		//  Add test snippet
		//  0 - modified
		//  3 - modified
		//  + 4 - modified
		app.find('button#snippet-delete-button').simulate('click');

		//  Confirm that 4 snippets are present at GUI
		//  + 0 - modified
		//  3 - modified
		expect(app.find('div.snippet-entry').length).toEqual(2);
	});
});


describe('PLACEHOLDERS', () => {
	test('add a placeholder', () => {
		//  Add 3 placeholders
		app.find('button#placeholder-add-button').simulate('click');
		app.find('button#placeholder-add-button').simulate('click');
		app.find('button#placeholder-add-button').simulate('click');
		app.update();

		//  Verify changes in the store
		const { selected, list } = store.getState().snippets;
		expect(list[selected].placeholders.length).toEqual(3);
	});

	test('remove all placeholders', () => {
		//  Remove all placeholders
		app.find('button#placeholder-delete-all-button').simulate('click');
		app.update();

		//  Verify changes in the store
		const { selected, list } = store.getState().snippets;
		expect(list[selected].placeholders.length).toEqual(0);
	});

	test('change a placeholder', () => {
		//  Add 3 placeholders
		app.find('button#placeholder-add-button').simulate('click');
		app.find('button#placeholder-add-button').simulate('click');
		app.find('button#placeholder-add-button').simulate('click');
		app.find('input#placeholder-0-input').simulate('change', { target: { value: 'cat' } });
		app.find('input#placeholder-1-input').simulate('change', { target: { value: 'dog' } });
		app.find('input#placeholder-2-input').simulate('change', { target: { value: 'bird' } });
		app.update();

		//  Verify changes in the store
		const { selected, list } = store.getState().snippets;
		expect(list[selected].placeholders.sort()).toEqual(['cat', 'dog', 'bird'].sort());
	});

	test('remove a placeholder', () => {
		//  Remove placeholder at 1 position
		app.find('button#placeholder-delete-1-button').simulate('click');
		app.update();

		//  Verify changes in the store
		const { selected, list } = store.getState().snippets;
		expect(list[selected].placeholders.sort()).toEqual(['cat', 'bird'].sort());
	});
});


describe('MODALS', () => {
	const trimString = (string) => {
		let modifiedString = string;
		modifiedString = modifiedString.replace(/\r/g, '');
		modifiedString = modifiedString.replace(/\n/g, '');
		modifiedString = modifiedString.replace(/\t/g, '');

		return modifiedString;
	};
	test('preview a snippet', () => {
		//  Modify body in order to apply placeholders
		const body = 'this is a cat and a dog and a bird example';
		app.find('textarea#snippet-body-input').simulate('change', { target: { name: 'body', value: body } });
		app.update();

		const expected = '"new snippet name": {"prefix": "new snippet prefix","body": ["this is a ${2:cat} and a dog and a ${1:bird} example"],"description": "new snippet description"}';

		//  Navigate to preview modal page
		app.find('button#snippet-preview-button').simulate('click');
		expect(trimString(app.find('textarea#preview-modal-textarea').prop('value'))).toEqual(expected);

		//	Copy to clipboard
		//	Can't find how to expect an exception or mock document.execCommand

		//  Dismiss modal
		app.find('button#dismiss-modal-button').simulate('click');
	});

	const importString = '{"importReact": {"prefix": "ir","body": ["import React from \'react\';"],"description": "import React from \'react\'"},"exportDefault": {"prefix": "ed","body": ["export default ${1:component};"],"description": "export default component"}}';
	test('importing snippets', () => {
		app.find('button#snippet-import-button').simulate('click');
		app.find('textarea#import-modal-textarea').simulate('change', { target: { value: importString } });
		app.find('button#import-modal-button').simulate('click');

		expect(Object.keys(store.getState().snippets.list).length).toEqual(2);
		expect(store.getState().snippets.list[0].name).toEqual('importReact');
		expect(store.getState().snippets.list[0].prefix).toEqual('ir');
		expect(store.getState().snippets.list[0].placeholders.length).toEqual(0);

		expect(store.getState().snippets.list[1].description).toEqual('export default component');
		expect(store.getState().snippets.list[1].body).toEqual('export default component;');
		expect(store.getState().snippets.list[1].placeholders.length).toEqual(1);
	});

	test('exporting snippets', () => {
		//  Navigate to export modal page
		app.find('button#snippet-export-button').simulate('click');
		expect(trimString(app.find('textarea#export-modal-textarea').prop('value'))).toEqual(importString);

		//	Copy to clipboard
		//	Can't find how to expect an exception or mock document.execCommand

		//  Dismiss modal
		app.find('button#dismiss-modal-button').simulate('click');
	});
});

afterAll(() => {
	app.unmount();
});
