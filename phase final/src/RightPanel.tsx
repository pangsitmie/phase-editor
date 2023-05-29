// RightPanel.tsx

import styled from "styled-components";
import ColorPicker from "./components/ColorPicker";
import { AppDispatch } from "./redux/store";
import { useDispatch, useSelector } from "react-redux";
import { useEffect, useState } from "react";
import { StyledInput } from "./components/styles/Input.styled";
import { H4 } from "./components/styles/H4.styled";
import { RootState } from "./redux/reducers";
import { updateElementColor, updateElementOpacity, updateElementX, updateElementY } from "./redux/elementsSlice";

const RightPanelWrapper = styled.div`
    position: relative;
    padding: 12px;
    z-index: 1;
    background-color: #232323;
`;


const RightPanel = () => {
    const dispatch: AppDispatch = useDispatch();


    // const selectedElement = selectedPage?.elements.find(element => element.id === selectedElementId);
    const elements = useSelector((state: RootState) => Object.values(state.elements.entities));
    const selectedElementId = useSelector((state: RootState) => state.elements.selectedElementId);
    const selectedElement = elements.find((element) => element.id === selectedElementId);


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

        if (selectedElement) {
            dispatch(updateElementX({ elementId: selectedElement.id, x: newX }));
        }
    };

    const handleYChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const newY = Number(e.target.value);
        setY(newY);  // Update local state

        if (selectedElement) {
            dispatch(updateElementY({ elementId: selectedElement.id, y: newY }));
        }
    };

    const handleColorChange = (color: string) => {
        if (selectedElement) {
            dispatch(updateElementColor({ elementId: selectedElement.id, color }));
        }
    };

    const handleOpacityChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const newOpacity = Number(e.target.value) / 100;  // Convert to 0-1 range
        setOpacity(newOpacity);  // Update local state

        if (selectedElement) {
            dispatch(updateElementOpacity({ elementId: selectedElement.id, opacity: newOpacity }));
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
                    <div className="mb-3 flex items-center justify-between">
                        <span className="mr-2">X</span>
                        <StyledInput type="number" min={0} max={999} value={x} onChange={handleXChange} />
                    </div>
                    <div className="mb-3 flex items-center justify-between">
                        <span className="mr-2">Y</span>
                        <StyledInput type="number" min={0} max={999} value={y} onChange={handleYChange} />
                    </div>
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
