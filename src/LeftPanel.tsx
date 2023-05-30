import styled from "styled-components";
import Pages from "./Pages";
import Elements from "./Elements";
import { H4 } from "./components/styles/H4.styled";

const LeftPanelWrapper = styled.div`
    overflow-y: auto;
    padding: 12px;
    z-index: 1;
    background-color: #232323;
`;

const LeftPanel = () => {
    return (
        <LeftPanelWrapper>
            <div className="mb-4">
                <H4 className="my-2 text-[#5b53ff]">PHASE EDITOR</H4>
                <hr className="border-[#3A3A3A]" />
            </div>

            <Pages />

            <Elements />
        </LeftPanelWrapper>
    )
}

export default LeftPanel