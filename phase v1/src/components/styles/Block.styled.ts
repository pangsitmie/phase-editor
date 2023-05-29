import styled from "styled-components";
import { BlockProps } from "../../interfaces";


//the x and y property is not used in this component
// we render the x and y in react dragable component

export const Block = styled.div<BlockProps>`
  position: absolute;
  width: 100px;
  height: 100px;
  opacity: ${(props) => props.o};
  background: ${(props) => props.color};
  outline: ${(props) => (props.selected ? '2px solid #5b53ff' : 'none')};
`;

// left: ${(props) => props.x}px;
// top: ${(props) => props.y}px;