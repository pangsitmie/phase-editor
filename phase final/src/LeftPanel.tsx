import styled from "styled-components";
import Pages from "./Pages";
import Elements from "./Elements";
import { H4 } from "./components/styles/H4.styled";
import { useSelector } from "react-redux";
import { RootState } from "./redux/reducers";

const LeftPanelWrapper = styled.div`
    overflow-y: auto;
    padding: 12px;
    z-index: 1;
    background-color: #232323;
`;

const LeftPanel = () => {

    const elements = useSelector((state: RootState) => state.elements.entities);
    const selectedElementId = useSelector((state: RootState) => state.elements.selectedElementId);

    const selectedElement = selectedElementId ? elements[selectedElementId] : null;

    return (
        <LeftPanelWrapper>
            <div className="mb-4">
                <H4 className="my-2 text-[#5b53ff]">PHASE EDITOR</H4>
                <hr className="border-[#3A3A3A]" />
            </div>

            <Pages />

            <Elements />
            <div>
                selected element:
                {selectedElement?.id} |
                {selectedElement?.x} |
                {selectedElement?.y}
            </div>
        </LeftPanelWrapper>
    )
}

export default LeftPanel