import styled from "styled-components";
import Pages from "./Pages";
import Elements from "./Elements";
import { H4 } from "./components/styles/H4.styled";
// import { useSelector } from "react-redux";
// import { RootState } from "./redux/store";
// import { Element, Page } from "./interfaces";

const LeftPanelWrapper = styled.div`
    overflow-y: auto;
    padding: 12px;
`;

const LeftPanel = () => {
    // const selectedPageId = useSelector((state: RootState) => state.pages.selectedPageId);
    // const selectedPage = useSelector((state: RootState) => state.pages.list.find((page: Page) => page.id === selectedPageId));

    // const selectedElementId = useSelector((state: RootState) => state.elements.selectedElementId) || null;
    // const selectedElement = selectedPage?.elements.find((element: Element) => element.id === selectedElementId);


    return (
        <LeftPanelWrapper>
            <div className="mb-4">
                <H4 className="my-2 text-[#5b53ff]">PHASE EDITOR</H4>
                <hr className="border-[#3A3A3A]" />
            </div>

            <Pages />
            <Elements />

            {/* render the selected Page and selected emelemnt in the redux store */}
            {/* <div>
                <br />

                <H4>
                    Selected Page:{selectedPage?.name || "No page selected"}
                </H4>

                <br />

                <H4>
                    Element:{selectedElement?.name || "No element selected"}
                    <br />
                    ID:{selectedElement?.id || "No element selected"}
                    <br />
                    X: {selectedElement?.x}
                    <br />
                    Y: {selectedElement?.y}
                    <br />
                    Color: {selectedElement?.color}
                </H4>
            </div> */}
        </LeftPanelWrapper>
    )
}

export default LeftPanel