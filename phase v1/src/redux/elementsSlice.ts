// src/redux/elementsSlice.ts
import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { Element } from '../interfaces';

interface ElementsState {
    list: Element[];
    selectedElementId?: string | null;
}

const initialState: ElementsState = {
    list: [],
    selectedElementId: null,
};

const elementsSlice = createSlice({
    name: 'elements',
    initialState,
    reducers: {
        setElements: (state, action: PayloadAction<Element[]>) => {
            state.list = action.payload;
        },
        selectElement: (state, action: PayloadAction<string | null>) => {
            state.selectedElementId = action.payload;
        },
        updateElement: (state, action: PayloadAction<Element>) => {
            const index = state.list.findIndex((el) => el.id === action.payload.id);
            if (index !== -1) {
                state.list[index] = action.payload;
            }
        },
        // additional reducers...
    },
});

export const { setElements, selectElement, updateElement } = elementsSlice.actions;
export default elementsSlice.reducer;
