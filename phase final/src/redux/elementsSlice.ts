import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { Element } from '../interfaces';

interface ElementsState {
    entities: {
        [key: string]: Element;
    };
    selectedElementId: string | null;
}

const initialState: ElementsState = {
    entities: {
        "element1": {
            id: "element1",
            name: "Element 1",
            x: 100,
            y: 100,
            opacity: 1,
            color: "#626267",
            children: ["child1"],
            pageId: "page1", // parent page
        },
        "element2": {
            id: "element2",
            name: "Element 2",
            x: 250,
            y: 100,
            opacity: 1,
            color: "#e16036",
            pageId: "page1", // parent page
        },
        "element3": {
            id: "element3",
            name: "Element 3",
            x: 300,
            y: 300,
            opacity: 1,
            color: "#ecfeaa",
            pageId: "page2", // parent page
        },
        "child1": {
            id: "child1",
            name: "Child 1",
            x: 150,
            y: 250,
            opacity: 1,
            color: "#ff785a",
            parentId: "element1", // parent element
            pageId: "page1", // parent page
        }
    },
    selectedElementId: null,
};



const elementsSlice = createSlice({
    name: 'elements',
    initialState,
    reducers: {
        selectElement: (state, action: PayloadAction<string | null>) => {
            state.selectedElementId = action.payload;
        },
        createElement: (state, action: PayloadAction<{ newElement: Element, parentId?: string }>) => {
            const { newElement, parentId } = action.payload;
            state.entities[newElement.id] = newElement;

            // If parentId exists, add new element to parent's children array
            if (parentId) {
                const parentElement = state.entities[parentId];
                if (parentElement) {
                    parentElement.children = [...(parentElement.children || []), newElement.id];
                }
            }
        },
        // Delete element also has recursion check to delete all child elements
        deleteElement: (state, action: PayloadAction<string>) => {
            const elementId = action.payload;
            if (state.entities[elementId]) {
                // Recursively delete all child elements
                if (state.entities[elementId].children) {
                    const { children } = state.entities[elementId];
                    if (children) {
                        children.forEach(childId => {
                            deleteElement(childId);
                        });
                    }
                }

                // Remove elementId from parent's children list
                const parentId = state.entities[elementId].parentId;
                if (parentId && state.entities[parentId]) {
                    state.entities[parentId].children = state.entities[parentId]?.children?.filter(id => id !== elementId);
                }

                // Delete the element
                delete state.entities[elementId];

                // If the deleted element was the selected one, unselect it
                if (state.selectedElementId === elementId) {
                    selectElement(null);
                }
            }
        },
        renameElement: (state, action: PayloadAction<{ elementId: string; name: string }>) => {
            const { elementId, name } = action.payload;
            if (state.entities[elementId]) {
                state.entities[elementId].name = name;
            }
        },
        // Update is used when dragging the element
        updateElement: (state, action: PayloadAction<{ id: string, x: number, y: number }>) => {
            const { id, x, y } = action.payload;
            if (state.entities[id]) {
                state.entities[id].x = x;
                state.entities[id].y = y;
            }
        },
        updateElementX(state, action: PayloadAction<{ elementId: string; x: number }>) {
            const { elementId, x } = action.payload;
            const element = state.entities[elementId];
            if (element) {
                element.x = x;
            }
        },
        updateElementY(state, action: PayloadAction<{ elementId: string; y: number }>) {
            const { elementId, y } = action.payload;
            const element = state.entities[elementId];
            if (element) {
                element.y = y;
            }
        },
        updateElementColor(state, action: PayloadAction<{ elementId: string; color: string }>) {
            const { elementId, color } = action.payload;
            const element = state.entities[elementId];
            if (element) {
                element.color = color;
            }
        },
        updateElementOpacity(state, action: PayloadAction<{ elementId: string; opacity: number }>) {
            const { elementId, opacity } = action.payload;
            const element = state.entities[elementId];
            if (element) {
                element.opacity = opacity;
            }
        },
        // more reducers here
    },
});

export const {
    selectElement,
    createElement,
    updateElement,
    deleteElement,
    renameElement,
    updateElementX,
    updateElementY,
    updateElementColor,
    updateElementOpacity,
} = elementsSlice.actions;
export default elementsSlice.reducer;
