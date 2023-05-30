import { updateElementX } from "../redux/elementsSlice";
import { updateElementOpacity } from "../redux/elementsSlice";
import { updateElementColor } from "../redux/elementsSlice";
import { updateElementY } from "../redux/elementsSlice";
import { createElement, deleteElement, renameElement, selectElement, updateElement } from "../redux/elementsSlice";
import store from "../redux/store";


// Test select element
test('Select an element from list with id', () => {
    let state = store.getState().elements;
    const initialElementCount = Object.keys(state.entities).length;

    const elementId = 'element2';

    store.dispatch(selectElement(elementId));
    state = store.getState().elements;

    expect(state.selectedElementId).toBe(elementId);
    expect(Object.keys(state.entities).length).toBe(initialElementCount);
});

// Test create new element
test('Create a new element with id', () => {
    let state = store.getState().elements;
    const initialElementCount = Object.keys(state.entities).length;

    const elementId = 'newElementId';

    store.dispatch(createElement({
        newElement: {
            id: elementId,
            name: 'newElementName',
            x: 0,
            y: 0,
            opacity: 1,
            color: 'black',
            // parentId: "page1", // parent page
            pageId: "page1", // parent page
        },
        // parentId: "page1", // Add this for a child element, this indicates the parent element id
    }));
    state = store.getState().elements;

    expect(Object.keys(state.entities).length).toBeGreaterThan(initialElementCount);
});

// Test rename element
test('Rename an element from list with id', () => {
    let state = store.getState().elements;
    const initialElementCount = Object.keys(state.entities).length;

    const elementId = 'element2';
    const newName = 'New Element Name';


    store.dispatch(renameElement({ elementId, name: newName }));
    state = store.getState().elements;

    const renamedElement = state.entities[elementId];

    expect(renamedElement.name).toBe(newName);
    expect(Object.keys(state.entities).length).toBe(initialElementCount);
});


// Test update element (used when dragging element)
test('Update an element from list with id', () => {
    let state = store.getState().elements;
    const initialElementCount = Object.keys(state.entities).length;

    const elementId = 'element2';
    const newX = 100;
    const newY = 100;

    store.dispatch(updateElement({ id: elementId, x: newX, y: newY }));
    state = store.getState().elements;

    const updatedElement = state.entities[elementId];

    expect(updatedElement.x).toBe(newX);
    expect(updatedElement.y).toBe(newY);
    expect(Object.keys(state.entities).length).toBe(initialElementCount);
});

// Test update element X value (used when updating X value from Right Panel)
test('Update an element X value from list with id', () => {
    let state = store.getState().elements;
    const initialElementCount = Object.keys(state.entities).length;

    const elementId = 'element2';
    const newX = 300;

    store.dispatch(updateElementX({ elementId: elementId, x: newX }));
    state = store.getState().elements;

    const updatedElement = state.entities[elementId];

    expect(updatedElement.x).toBe(newX);
    expect(Object.keys(state.entities).length).toBe(initialElementCount);
});

// Test update element Y value (used when updating Y value from Right Panel)
test('Update an element Y value from list with id', () => {
    let state = store.getState().elements;
    const initialElementCount = Object.keys(state.entities).length;

    const elementId = 'element2';
    const newY = 300;

    store.dispatch(updateElementY({ elementId: elementId, y: newY }));
    state = store.getState().elements;

    const updatedElement = state.entities[elementId];

    expect(updatedElement.y).toBe(newY);
    expect(Object.keys(state.entities).length).toBe(initialElementCount);
});

// Test update element opacity value (used when updating opacity value from Right Panel)
test('Update an element opacity value from list with id', () => {
    let state = store.getState().elements;
    const initialElementCount = Object.keys(state.entities).length;

    const elementId = 'element2';
    const newOpacity = 0.5;

    store.dispatch(updateElementOpacity({ elementId: elementId, opacity: newOpacity }));
    state = store.getState().elements;

    const updatedElement = state.entities[elementId];

    expect(updatedElement.opacity).toBe(newOpacity);
    expect(Object.keys(state.entities).length).toBe(initialElementCount);
});

// Test update element color value (used when updating color value from Right Panel)
test('Update an element color value from list with id', () => {
    let state = store.getState().elements;
    const initialElementCount = Object.keys(state.entities).length;

    const elementId = 'element2';
    const newColor = '#123123';

    store.dispatch(updateElementColor({ elementId: elementId, color: newColor }));
    state = store.getState().elements;

    const updatedElement = state.entities[elementId];

    expect(updatedElement.color).toBe(newColor);
    expect(Object.keys(state.entities).length).toBe(initialElementCount);
});

// Test Delete child element
test('Delete a child element from list with id', () => {
    let state = store.getState().elements;
    const initialElementCount = Object.keys(state.entities).length;

    const childElementId = 'child1';

    //first get the parent element of this child element
    const parentElementId = Object.values(state.entities).find(element => element.id === childElementId)?.parentId;

    store.dispatch(deleteElement(childElementId));
    state = store.getState().elements;

    expect(Object.keys(state.entities).length).toBeLessThan(initialElementCount);

    // Check if parent element still has child element
    if (parentElementId) {
        const parentElement = state.entities[parentElementId];
        expect(parentElement.children).not.toContain(childElementId);
    }
});


// Test delete element
test('Delete an element from list with id', () => {
    let state = store.getState().elements;
    const initialElementCount = Object.keys(state.entities).length;

    store.dispatch(deleteElement('element2'));
    state = store.getState().elements;

    expect(Object.keys(state.entities).length).toBeLessThan(initialElementCount);
});