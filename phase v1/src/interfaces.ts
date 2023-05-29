export interface Page {
    id: string;
    name: string;
    elements: Element[];
}

export interface Element {
    id: string;
    name: string;
    x: number;
    y: number;
    opacity: number;
    color: string;
    children?: Element[];
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