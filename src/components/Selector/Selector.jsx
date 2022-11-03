import { useEffect, useState } from "react";

import "./selector.css";

import { ReactComponent as CaretLeft } from "./caret-left.svg";
import { ReactComponent as CaretRight } from "./caret-right.svg";

const Selector = ({
    name,
    options = [],
    selected,
    labelKey,
    onChange,
    disabled,
}) => {
    const [selectedI, setSelectedI] = useState(0);

    useEffect(() => {
        let index = 0;
        for (; index < options.length; index++) {
            if (JSON.stringify(options[index]) === JSON.stringify(selected)) {
                break;
            }
        }
        setSelectedI(index);
    }, [selected, options]);

    const handleLeftCaret = () => {
        const newSelectedIndex =
            selectedI - 1 < 0 ? options.length - 1 : selectedI - 1;
        setSelectedI(newSelectedIndex);
        onChange({ name, value: options[newSelectedIndex] });
    };

    const handleRightCaret = () => {
        const newSelectedIndex =
            selectedI + 1 >= options.length ? 0 : selectedI + 1;
        setSelectedI(newSelectedIndex);
        onChange({ name, value: options[newSelectedIndex] });
    };

    return (
        <div className="selector">
            {disabled || (
                <button className="selector-btn" onClick={handleLeftCaret}>
                    <CaretLeft />
                </button>
            )}
            <p className="selected-option">{options[selectedI][labelKey]}</p>
            {disabled || (
                <button className="selector-btn" onClick={handleRightCaret}>
                    <CaretRight />
                </button>
            )}
        </div>
    );
};

export default Selector;
