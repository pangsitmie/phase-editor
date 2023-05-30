
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import styled from "styled-components";
import { AppDispatch, RootState } from "./redux/store";
import { StyledElement } from "./components/styles/Element.styled";
import { StyledAddButton } from "./components/styles/AddButton.styled";
import { H4 } from "./components/styles/H4.styled";
import { Element, Page } from "./interfaces";
import { TbCircleDashed } from 'react-icons/tb';
import { StyledInput } from "./components/styles/Input.styled";
import { createElement, selectElement, updateElementName } from "./redux/pagesSlice";


const ElementsWrapper = styled.div`
    padding-top: 16px;
`;


const Elements = () => {
    const dispatch: AppDispatch = useDispatch();

    const pages = useSelector((state: RootState) => state.pages.list);

    // Get the currently selected page
    const selectedPageId = useSelector((state: RootState) => state.pages.selectedPageId);
    const selectedPage = pages.find((page: Page) => page.id === selectedPageId);

    // Get the currently selected element
    const selectedElementId = useSelector((state: RootState) => state.pages.selectedElementId) || null;


    // If there's no selected page, render a message
    if (!selectedPage) {
        return <ElementsWrapper>
            Please select a page to view its elements.
        </ElementsWrapper>
    }

    const handleCreateElement = () => {
        if (selectedPage) {
            dispatch(createElement(selectedPage.id));
        }
    };

    // Select the element
    const handleElementSelect = (elementId: string) => {
        dispatch(selectElement(elementId));
    };

    const [editingElementId, setEditingElementId] = useState<string | null>(null);
    const handleElementRename = (elementId: string) => {
        setEditingElementId(elementId); // Set the page ID as the editing page
    };

    const handleElementNameChange = (e: React.ChangeEvent<HTMLInputElement>, elementId: string) => {
        // Check if selectedPageId is not null
        if (selectedPageId !== null) {
            // Update the element name in the Redux state
            dispatch(updateElementName({ pageId: selectedPageId, elementId: elementId, name: e.target.value }));
        }
    };

    const handleElementNameBlur = () => {
        setEditingElementId(null); // Clear the editing state when blurring the input field
    };

    return (
        <ElementsWrapper>
            <div className="flex gap-4 justify-between mb-4">
                <H4>Elements</H4>
                <StyledAddButton
                    onClick={handleCreateElement}
                >
                    +
                </StyledAddButton>
            </div>

            {selectedPage.elements.map((element: Element) => (
                <StyledElement
                    key={element.id}
                    className={element.id === selectedElementId ? 'active' : ''} // if the element is selected, add the active class
                    onClick={() => handleElementSelect(element.id)}
                    onDoubleClick={() => handleElementRename(element.id)}
                >
                    {editingElementId === element.id ? (
                        <StyledInput
                            type="text"
                            value={element.name}
                            autoFocus
                            onChange={(e: React.ChangeEvent<HTMLInputElement>) => handleElementNameChange(e, element.id)}
                            onBlur={handleElementNameBlur}
                            onKeyDown={(e: React.KeyboardEvent) => {
                                if (e.key === 'Enter') {
                                    // Check if the target is an input field and blur it
                                    if (e.currentTarget instanceof HTMLInputElement) {
                                        e.currentTarget.blur();
                                    }
                                }
                            }}
                        />

                    ) : (
                        <div className="flex items-center justify-left">
                            <TbCircleDashed className="mr-2" />
                            {element.id === selectedElementId ? <strong>{element.name}</strong> : element.name}
                        </div>
                    )}
                </StyledElement>
            ))}
        </ElementsWrapper>
    );
};

export default Elements;
