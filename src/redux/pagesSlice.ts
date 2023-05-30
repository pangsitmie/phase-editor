import { createSlice, PayloadAction, createAsyncThunk } from '@reduxjs/toolkit';
import { Page } from '../interfaces';
import { RootState } from './reducers';
import { deleteElement } from './elementsSlice';

interface PagesState {
  entities: {
    [key: string]: Page; // key is page id(type string) and it has a property of Page Type
  };
  selectedPageId: string | null; // Currently selected page id in redux store
}


const initialState: PagesState = {
  entities: {
    "page1": {
      id: "page1",
      name: "Page 1",
      elements: ["element1", "element2"]
    },
    "page2": {
      id: "page2",
      name: "Page 2",
      elements: ["element3"]
    }
  },
  selectedPageId: null,
};



const pagesSlice = createSlice({
  name: 'pages',
  initialState,
  reducers: {
    selectPage: (state, action: PayloadAction<string>) => {
      state.selectedPageId = action.payload;
    },
    // createPage is used in createPageAsync
    createPage: (state, action: PayloadAction<Page>) => {
      state.entities[action.payload.id] = action.payload;

      //set the selected page to the newly created page
      state.selectedPageId = action.payload.id;
    },
    deletePage: (state, action: PayloadAction<string>) => {
      const pageId = action.payload;
      if (state.entities[pageId]) {
        // Dispatch actions to delete all elements of the page
        state.entities[pageId].elements.forEach(elementId => {
          deleteElement(elementId);
        });
        // And delete the page itself
        delete state.entities[pageId];
      }
    },
    addElementToPage: (state, action: PayloadAction<{ pageId: string; elementId: string }>) => {
      const { pageId, elementId } = action.payload;
      if (state.entities[pageId]) {
        state.entities[pageId].elements = [...state.entities[pageId].elements, elementId];
      }
    },
    removeElementFromPage: (state, action: PayloadAction<{ pageId: string; elementId: string }>) => {
      const { pageId, elementId } = action.payload;
      if (state.entities[pageId]) {
        // Filter will create new array with all elements except the one with elementId that wants to be removed
        state.entities[pageId].elements = state.entities[pageId].elements.filter(id => id !== elementId);
      }
    },
    renamePage: (state, action: PayloadAction<{ pageId: string; name: string }>) => {
      const { pageId, name } = action.payload;
      if (state.entities[pageId]) {
        state.entities[pageId].name = name;
      }
    },
    // more reducers bellow
  },
});

export const {
  selectPage,
  createPage,
  deletePage,
  addElementToPage,
  removeElementFromPage,
  renamePage,
} = pagesSlice.actions;

export default pagesSlice.reducer;


// Async action to create a page
export const createPageAsync = createAsyncThunk(
  'pages/createPage',
  async (_, { dispatch, getState }) => {
    const state = getState() as RootState;
    const pageIndexes = Object.keys(state.pages.entities).map((id) => parseInt(id.replace('page', '')));
    const maxPageIndex = Math.max(...pageIndexes, 0);
    const newPageIndex = maxPageIndex + 1;
    const newPage: Page = { id: `page${newPageIndex}`, name: `Page ${newPageIndex}`, elements: [] };
    dispatch(createPage(newPage));
  }
);