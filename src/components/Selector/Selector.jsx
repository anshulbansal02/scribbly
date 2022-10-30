import { useEffect, useState } from "react";

import "./selector.css";

import { ReactComponent as CaretLeft } from "./caret-left.svg";
import { ReactComponent as CaretRight } from "./caret-right.svg";

const Selector = ({ name, options = [], selected, labelKey, onChange }) => {
    const [selectedOption, setSelectedOption] = useState(selected);
    const [selectedI, setSelectedI] = useState(null);

    useEffect(() => {
        let index = 0;
        for (; index < options.length; index++) {
            if (options[index] === selectedOption) {
                break;
            }
        }
        setSelectedI(index);
    }, [selectedOption]);

    const handleLeftCaret = () => {
        const newSelectedIndex =
            selectedI - 1 < 0 ? options.length - 1 : selectedI - 1;

        setSelectedOption(options[newSelectedIndex]);
        onChange({ name, value: options[newSelectedIndex] });
    };

    const handleRightCaret = () => {
        const newSelectedIndex =
            selectedI + 1 >= options.length ? 0 : selectedI + 1;
        setSelectedOption(options[newSelectedIndex]);
        onChange({ name, value: options[newSelectedIndex] });
    };

    return (
        <div className="selector">
            <button className="selector-btn" onClick={handleLeftCaret}>
                <CaretLeft />
            </button>
            <p className="selected-option">{selectedOption[labelKey]}</p>
            <button className="selector-btn" onClick={handleRightCaret}>
                <CaretRight />
            </button>
        </div>
    );
};

export default Selector;
