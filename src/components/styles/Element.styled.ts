import styled from "styled-components";

export const StyledElement = styled.div`
    width: 100%;
    padding: 0.5rem;
    margin-bottom: 0.5rem;
    text-align: left;
    backgroundColor: transparent;
    cursor: pointer;
    border: 1px solid transparent;
    border-radius: 0.5rem;

    &:hover {
        border: 1px solid #5b53ff;
    }
    
    &.active {
        border: 1px solid #5b53ff;
    }
`
