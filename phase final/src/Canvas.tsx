import styled from "styled-components";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch } from "./redux/store";
import { selectElement, updateElement } from "./redux/elementsSlice";
import { Block } from "./components/styles/Block.styled";
import Draggable, { DraggableData, DraggableEvent } from "react-draggable";
import React, { useRef } from "react";
import { RootState } from "./redux/reducers";


const CanvasWrapper = styled.div`
  position: relative;
  background: #1E1E1E;
  overflow: hidden;
`;


const Canvas = () => {
  const dispatch: AppDispatch = useDispatch();

  const elementRef = useRef(null);

  const selectedPageId = useSelector((state: RootState) => state.pages.selectedPageId);
  const selectedPage = useSelector((state: RootState) => selectedPageId ? state.pages.entities[selectedPageId] : null);
  const elements = useSelector((state: RootState) => state.elements.entities);
  const selectedElementId = useSelector((state: RootState) => state.elements.selectedElementId);


  const handleElementSelect = (elementId: string) => {
    dispatch(selectElement(elementId));
  };

  const handleElementDrag = (_: DraggableEvent, ui: DraggableData, elementId: string) => {
    dispatch(updateElement({
      id: elementId,
      x: ui.x,
      y: ui.y
    }));
  };


  // ===================== RENDER =====================
  const renderElement = (elementId: string) => {
    const element = elements[elementId];
    // Check if the element still exists
    if (!element) {
      return null;
    }

    return (
      <React.Fragment key={element.id}>
        <Draggable
          nodeRef={elementRef}
          onDrag={(e, ui) => handleElementDrag(e, ui, element.id)}
          position={{ x: element.x, y: element.y }}
        >
          <Block
            ref={elementRef}
            o={element.opacity}
            selected={element.id === selectedElementId}
            color={element.color}
            onClick={() => handleElementSelect(element.id)}
          >
            {element.name}
          </Block>
        </Draggable>
        {element.children && element.children.map((childId) => renderElement(childId))}
      </React.Fragment>
    );
  };

  return (
    <CanvasWrapper>
      {selectedPage && selectedPage.elements.map((elementId) => renderElement(elementId))}
    </CanvasWrapper>
  );
};

export default Canvas;
