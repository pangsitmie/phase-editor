import { combineReducers } from '@reduxjs/toolkit';
import pagesReducer from './pagesSlice';
import elementsReducer from './elementsSlice';

const rootReducer = combineReducers({
    pages: pagesReducer, // sliceName: reducer
    elements: elementsReducer, // sliceName: reducer
});

export type RootState = ReturnType<typeof rootReducer>;

export default rootReducer;
