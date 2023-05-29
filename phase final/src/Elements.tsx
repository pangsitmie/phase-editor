
import { useDispatch, useSelector } from "react-redux";
import styled from "styled-components";
import { StyledIconButton } from "./components/styles/IconButton.styled";
import { H4 } from "./components/styles/H4.styled";
import { RootState } from "./redux/reducers";
import { StyledElement } from "./components/styles/Element.styled";
import { TbCircleDashed } from 'react-icons/tb';
import { createElement, deleteElement, renameElement, selectElement } from "./redux/elementsSlice";
import { useState } from "react";
import { StyledInput } from "./components/styles/Input.styled";
import { addElementToPage, removeElementFromPage } from "./redux/pagesSlice";
import { v4 as uuidv4 } from 'uuid';



const ElementsWrapper = styled.div`
    padding-top: 16px;
`;


const Elements = () => {
    const selectedPageId = useSelector((state: RootState) => state.pages.selectedPageId);
    const selectedPage = useSelector((state: RootState) => selectedPageId ? state.pages.entities[selectedPageId] : null);
    const elements = useSelector((state: RootState) => state.elements.entities);

    const selectedElementId = useSelector((state: RootState) => state.elements.selectedElementId);

    const dispatch = useDispatch();
    const handleElementSelect = (elementId: string) => {
        dispatch(selectElement(elementId));
    };

    const [editingElementId, setEditingElementId] = useState<string | null>(null);

    const updateElementName = (e: React.ChangeEvent<HTMLInputElement>, elementId: string) => {
        dispatch(renameElement({ elementId, name: e.target.value }));
    };

    const handleElementRename = (elementId: string) => {
        setEditingElementId(elementId); // Set the element ID as the editing element
    };

    const handleElementNameBlur = () => {
        setEditingElementId(null); // Clear the editing state when blurring the input field
    };

    const handleCreateElement = (parentId?: string) => {
        if (selectedPageId) {
            const newElementId = uuidv4();

            const newElement = {
                id: newElementId,
                name: "Element",
                x: 50,
                y: 50,
                opacity: 1,
                color: "#cecece",
                children: [],
                pageId: selectedPageId // Add pageId in the element
            };

            // Dispatch the createElement action
            dispatch(createElement({ newElement, parentId }));

            // Dispatch the addElementToPage action only if parentId is not provided
            if (!parentId) {
                dispatch(addElementToPage({ pageId: selectedPageId, elementId: newElementId }));
            }
        }
    };

    const handleDeleteElement = (elementId: string) => {
        console.log('handleDeleteElement' + elementId);

        // We need to remove the element reference from the page first (pageSlice)
        if (selectedPageId) {
            dispatch(removeElementFromPage({ pageId: selectedPageId, elementId: elementId }));
        }

        // Then we can delete the element (elementSlice)
        dispatch(deleteElement(elementId));
    };



    const renderElements = (elementIds: string[], level = 0) => {
        return elementIds.map((id) => {
            const element = elements[id];

            if (!element) return null;


            return (
                <div key={element.id} style={{ paddingLeft: `${level / 2}rem` }}>
                    <StyledElement
                        onClick={() => handleElementSelect(element.id)}
                        onDoubleClick={() => handleElementRename(element.id)}
                        className={element.id === selectedElementId ? 'active' : ''}
                    >
                        <div className="flex justify-between">

                            <div className="flex items-center justify-left">
                                <TbCircleDashed className="mr-2" />
                                {editingElementId === element.id ?
                                    (
                                        <StyledInput
                                            type="text"
                                            value={element.name}
                                            autoFocus
                                            onChange={(e: React.ChangeEvent<HTMLInputElement>) => updateElementName(e, element.id)}
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
                                    ) :
                                    (
                                        <div>{element.name}</div>
                                    )
                                }
                            </div>
                            <div className="flex gap-1">
                                <StyledIconButton
                                    onClick={() => handleDeleteElement(element.id)}
                                    className="text-[#484848] hover:text-white">
                                    -
                                </StyledIconButton>
                                <StyledIconButton
                                    onClick={() => handleCreateElement(element.id)}>
                                    +
                                </StyledIconButton>
                            </div>

                        </div>
                    </StyledElement>
                    {element.children && renderElements(element.children, level + 1)}
                </div>
            );
        });
    };

    return (
        <ElementsWrapper>
            <div className="flex gap-4 justify-between mb-4">
                <H4>Elements</H4>
                <StyledIconButton onClick={() => handleCreateElement()}>
                    +
                </StyledIconButton>
            </div>
            {selectedPage && renderElements(selectedPage.elements)}
        </ElementsWrapper>
    );
};

export default Elements;
