import styled from "styled-components";
import ColorPicker from "./components/ColorPicker";
import { AppDispatch, RootState } from "./redux/store";
import { useDispatch, useSelector } from "react-redux";
import { useEffect, useState } from "react";
import { StyledInput } from "./components/styles/Input.styled";
import { updateElementColor, updateElementOpacity, updateElementX, updateElementY } from "./redux/pagesSlice";
import { H4 } from "./components/styles/H4.styled";

const RightPanelWrapper = styled.div`
    position: relative;
    padding: 12px;
`;

const Label = styled.label`
    display: grid;
    margin-bottom: 8px;
    grid-template-columns: 16px auto minmax(0, 1fr);
    grid-gap: 10px;
`;

const RightPanel = () => {
    const dispatch: AppDispatch = useDispatch();

    const selectedElementId = useSelector((state: RootState) => state.pages.selectedElementId);
    const selectedPageId = useSelector((state: RootState) => state.pages.selectedPageId);

    const selectedPage = useSelector((state: RootState) => state.pages.list.find(page => page.id === selectedPageId));
    const selectedElement = selectedPage?.elements.find(element => element.id === selectedElementId);


    const [x, setX] = useState(0);
    const [y, setY] = useState(0);
    const [opacity, setOpacity] = useState(1);

    useEffect(() => {
        if (selectedElement) {
            setX(selectedElement.x);
            setY(selectedElement.y);
            setOpacity(selectedElement.opacity);
        }
    }, [selectedElement]);

    const handleXChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const newX = Number(e.target.value);
        setX(newX);  // Update local state

        if (selectedElement && selectedPageId) {
            dispatch(updateElementX({ pageId: selectedPageId, elementId: selectedElement.id, x: newX }));
        }
    };

    const handleYChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const newY = Number(e.target.value);
        setY(newY);  // Update local state

        if (selectedElement && selectedPageId) {
            dispatch(updateElementY({ pageId: selectedPageId, elementId: selectedElement.id, y: newY }));
        }
    };

    const handleColorChange = (color: string) => {
        if (selectedElement && selectedPageId) {
            dispatch(updateElementColor({ pageId: selectedPageId, elementId: selectedElement.id, color }));
        }
    };

    const handleOpacityChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const newOpacity = Number(e.target.value) / 100;  // Convert to 0-1 range
        setOpacity(newOpacity);  // Update local state

        if (selectedElement && selectedPageId) {
            dispatch(updateElementOpacity({ pageId: selectedPageId, elementId: selectedElement.id, opacity: newOpacity }));
        }
    };



    if (!selectedElement) {
        return <RightPanelWrapper>Select an element...</RightPanelWrapper>
    }

    return (
        <RightPanelWrapper>
            <div className="mb-4">
                <div className="flex justify-between">
                    <p className="mb-2 text-[#cecece]">Design</p>
                    <p className="mb-2 text-[#cecece]">Jeriel Isaiah</p>
                </div>
                <hr className="border-[#3A3A3A]" />
            </div>
            <div className="mb-4">
                <H4 className="mb-4">Position</H4>
                <div className="mb-3 flex items-center justify-between">
                    <Label>
                        X <StyledInput type="number" min={0} max={999} value={x} onChange={handleXChange} />
                    </Label>
                    <Label>
                        Y <StyledInput type="number" min={0} max={999} value={y} onChange={handleYChange} />
                    </Label>
                </div>
                <hr />
            </div>

            <div className="">
                <H4 className="mb-4">Color</H4>
                <div className="mb-3 flex items-center justify-between">
                    <span className="mr-2">Fill:</span>
                    <ColorPicker color={selectedElement.color} onColorChange={handleColorChange} />

                </div>
            </div>

            <div>
                <div className="mb-3 flex items-center justify-between">
                    <span className="mr-[30%]">Opacity:</span>
                    <StyledInput type="number" min={0} max={100} value={opacity * 100} onChange={handleOpacityChange} />
                </div>


                <input type="range" min={0} max={100} value={opacity * 100} onChange={handleOpacityChange} className='w-full' />

            </div>
        </RightPanelWrapper>
    );
};

export default RightPanel;
