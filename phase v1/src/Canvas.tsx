import styled from "styled-components";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "./redux/store";
import { Block } from "./components/styles/Block.styled";
import { Element, Page } from "./interfaces";
import Draggable, { DraggableData, DraggableEvent } from "react-draggable";
import { selectElement, updateElementPosition } from "./redux/pagesSlice";
import { useRef } from "react";


const CanvasWrapper = styled.div`
  position: relative;
  background: #1E1E1E;
  overflow: hidden;
`;


const Canvas = () => {
  const dispatch: AppDispatch = useDispatch();

  const elementRef = useRef(null);



  const selectedPageId = useSelector((state: RootState) => state.pages.selectedPageId);
  const selectedPage = useSelector((state: RootState) => state.pages.list.find((page: Page) => page.id === selectedPageId));

  const selectedElementId = useSelector((state: RootState) => state.pages.selectedElementId) || null;


  // inside the Elements component
  const handleElementSelect = (elementId: string) => {
    dispatch(selectElement(elementId));
  };


  const handleElementDrag = (_: DraggableEvent, ui: DraggableData, elementId: string) => {
    if (selectedPageId) {
      dispatch(updateElementPosition({
        pageId: selectedPageId,
        elementId: elementId,
        x: ui.x,
        y: ui.y
      }));
    } else {
      console.error('selectedPageId is null');
    }
  }

  return (
    <CanvasWrapper>
      {selectedPage?.elements.map((element: Element) => (
        <Draggable
          key={element.id}
          nodeRef={elementRef} // This is for prevent error in react dragable
          onDrag={(e: any, ui: any) => handleElementDrag(e, ui, element.id)}
          position={{ x: element.x, y: element.y }}
        >
          <Block
            ref={elementRef} // This is for prevent error in react dragable
            // The X and Y are set in the Dragable component
            // x={element.x}
            // y={element.y}
            o={element.opacity}
            selected={element.id === selectedElementId}
            color={element.color}
            onClick={() => handleElementSelect(element.id)}
          />
        </Draggable>
      ))}
    </CanvasWrapper>
  );
};

export default Canvas;
