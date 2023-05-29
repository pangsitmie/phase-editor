import { useRef, useEffect } from "react";
import styled from "styled-components";

const ColorPickerWrapper = styled.div`
  width: 16px;
  height: 16px;
  align-self: center;
  overflow: hidden;
`;

const ColorInput = styled.input`
  opacity: 0;
  display: block;
  width: 32px;
  height: 32px;
  border: none;
`;

ColorInput.defaultProps = {
    type: "color"
};

interface ColorPickerProps {
    color: string;
    onColorChange: (color: string) => void;
}

const ColorPicker: React.FC<ColorPickerProps> = ({ color, onColorChange }) => {
    const ref = useRef<HTMLDivElement>(null);
    const inputRef = useRef<HTMLInputElement>(null);

    useEffect(() => {
        if (ref.current && inputRef.current) {
            ref.current.style.background = color;
        }
    }, [color]);

    const handleColorChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        onColorChange(e.target.value);
    };

    return (
        <ColorPickerWrapper ref={ref}>
            <ColorInput value={color} onChange={handleColorChange} ref={inputRef} />
        </ColorPickerWrapper>
    );
};

export default ColorPicker;
