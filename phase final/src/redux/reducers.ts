import { combineReducers } from '@reduxjs/toolkit';
import pagesReducer from './pagesSlice';
import elementsReducer from './elementsSlice';

const rootReducer = combineReducers({
    pages: pagesReducer,
    elements: elementsReducer,
});

export type RootState = ReturnType<typeof rootReducer>;

export default rootReducer;
