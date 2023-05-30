export interface Page {
    id: string;
    name: string;
    elements: string[]; // IDs of elements
}
export interface Element {
    id: string;
    name: string;
    x: number;
    y: number;
    opacity: number;
    color: string;
    children?: string[]; // IDs of child elements
    parentId?: string;  // Parent element ID (top level element doesnt require this)
    pageId?: string;   // Page ID the element is located on
}
export interface BlockProps {
    x?: number;
    y?: number;
    o: number;
    selected?: boolean;
    color: string;
}
export interface UpdateElementPalyload {
    id: string;
    x: number;
    y: number;
}