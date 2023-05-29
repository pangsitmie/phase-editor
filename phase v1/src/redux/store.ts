// src/redux/store.ts
import { configureStore } from '@reduxjs/toolkit';
import pagesSlice, { createElement, selectPage } from './pagesSlice';
import elementsSlice, { selectElement } from './elementsSlice';
import { useDispatch as _useDispatch } from 'react-redux'



export const store = configureStore({
    reducer: {
        pages: pagesSlice,
        elements: elementsSlice,
    },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
export const useDispatch = () => _useDispatch<AppDispatch>();

// Action to select a page and its first element simultaneously
// Action to select a page and its first element simultaneously
export const selectPageAndFirstElement = (pageId: string) => (dispatch: AppDispatch, getState: () => RootState) => {
    const state = getState();
    const page = state.pages.list.find(page => page.id === pageId);
    if (!page) throw new Error(`Page with ID ${pageId} not found`);

    dispatch(selectPage(pageId));

    // Only select the first element if it exists
    if (page.elements.length > 0) {
        dispatch(selectElement(page.elements[0].id));
    } else {
        // Set selectedElementId to null if there are no elements
        dispatch(selectElement(null));
    }
};

export const createElementAndSelect = (pageId: string) => (dispatch: AppDispatch, getState: () => RootState) => {
    dispatch(createElement({ pageId: pageId, color: '#FFFFFF' }));  // Assuming default color is black
    const state = getState();
    const page = state.pages.list.find(page => page.id === pageId);
    if (page && page.elements.length > 0) {
        dispatch(selectElement(page.elements[page.elements.length - 1].id));
    }
};
