import styled from "styled-components";
import { BlockProps } from "../../interfaces";

// The x and y property is not used in this component
// We render the x and y in react dragable component

export const Block = styled.div<BlockProps>`
  position: absolute;
  width: 100px;
  height: 100px;
  opacity: ${(props) => props.o};
  background: ${(props) => props.color};
  outline: ${(props) => (props.selected ? '2px solid #5b53ff' : 'none')};
  display: flex;
  justify-content: center;
  align-items: center;
  cursor: grab;
`;