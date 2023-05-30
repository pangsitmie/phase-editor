import { addElementToPage, createPageAsync, deletePage, removeElementFromPage, renamePage, selectPage } from "../redux/pagesSlice";
import store from "../redux/store";



// Test create new page
test('Create a new page', async () => {
    let state = store.getState().pages;
    const initialPageCount = Object.keys(state.entities).length;

    await store.dispatch(createPageAsync());
    state = store.getState().pages;

    expect(Object.keys(state.entities).length).toBeGreaterThan(initialPageCount);
});

// Test rename page
test('Rename a page from list with id', () => {
    let state = store.getState().pages;
    const initialPageCount = Object.keys(state.entities).length;

    const pageId = 'page1';
    const newName = 'New Page Name';

    store.dispatch(renamePage({ pageId, name: newName }));
    state = store.getState().pages;

    const renamedPage = state.entities[pageId];
    expect(renamedPage.name).toBe(newName);
    expect(Object.keys(state.entities).length).toBe(initialPageCount);
});

// Test select / switch page
test('Select a page from list with id', () => {
    let state = store.getState().pages;
    const initialPageCount = Object.keys(state.entities).length;

    const pageId = 'page2';

    store.dispatch(selectPage(pageId));
    state = store.getState().pages;

    expect(state.selectedPageId).toBe(pageId);
    expect(Object.keys(state.entities).length).toBe(initialPageCount);
});

// Test delete page
test('Delete a page from list with id', () => {
    let state = store.getState().pages;
    const initialPageCount = Object.keys(state.entities).length;

    store.dispatch(deletePage('page2'));
    state = store.getState().pages;

    expect(Object.keys(state.entities).length).toBeLessThan(initialPageCount);
});

// Test add element to page
test('Add an element to a page', () => {
    let state = store.getState().pages;
    const initialPageCount = Object.keys(state.entities).length;

    const pageId = 'page1';
    const elementId = 'element1';

    store.dispatch(addElementToPage({ pageId, elementId }));
    state = store.getState().pages;

    const page = state.entities[pageId];
    expect(page.elements).toContain(elementId);
    expect(Object.keys(state.entities).length).toBe(initialPageCount);
});

// Test remove element from page
test('Remove an element from a page', () => {
    let state = store.getState().pages;
    const initialPageCount = Object.keys(state.entities).length;

    const pageId = 'page1';
    const elementId = 'element1';

    store.dispatch(addElementToPage({ pageId, elementId }));
    state = store.getState().pages;

    store.dispatch(removeElementFromPage({ pageId, elementId }));
    state = store.getState().pages;

    const page = state.entities[pageId];
    expect(page.elements).not.toContain(elementId);
    expect(Object.keys(state.entities).length).toBe(initialPageCount);
});



