import { configureStore } from '@reduxjs/toolkit';
import pagesSlice, { selectPage } from './pagesSlice';
import { useDispatch as _useDispatch } from 'react-redux'



export const store = configureStore({
    reducer: {
        pages: pagesSlice,
    },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
export const useDispatch = () => _useDispatch<AppDispatch>();

// Action to select a page and its first element simultaneously
export const selectPageAndFirstElement = (pageId: string) => (dispatch: AppDispatch, getState: () => RootState) => {
    const state = getState();
    const page = state.pages.list.find(page => page.id === pageId);
    if (!page) throw new Error(`Page with ID ${pageId} not found`);

    dispatch(selectPage(pageId));
};
