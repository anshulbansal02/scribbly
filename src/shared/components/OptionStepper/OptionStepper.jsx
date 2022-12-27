import classNames from "classnames";
import styles from "./OptionStepper.module.css";

import { ReactComponent as ArrowLeft } from "./static/arrow-left.svg";
import { ReactComponent as ArrowRight } from "./static/arrow-right.svg";

const OptionStepper = ({
    options = [],
    labelKey,
    value,
    onChange,
    disabled,
    className,
}) => {
    const handleLeftCaret = () => {
        const newSelectedIndex =
            selectedI - 1 < 0 ? options.length - 1 : selectedI - 1;
        onChange?.call(null, { target: { value: options[newSelectedIndex] } });
    };

    const handleRightCaret = () => {
        const newSelectedIndex =
            selectedI + 1 >= options.length ? 0 : selectedI + 1;
        onChange?.call(null, { target: { value: options[newSelectedIndex] } });
    };

    let selectedI = 0;
    for (; selectedI < options.length; selectedI++) {
        if (JSON.stringify(options[selectedI]) === JSON.stringify(value)) break;
    }

    return (
        <div className={classNames(styles.container, className)}>
            {disabled || (
                <button className={styles.btn} onClick={handleLeftCaret}>
                    <ArrowLeft />
                </button>
            )}
            <p className={styles.optionLabel}>
                {labelKey ? options[selectedI][labelKey] : options[selectedI]}
            </p>
            {disabled || (
                <button className={styles.btn} onClick={handleRightCaret}>
                    <ArrowRight />
                </button>
            )}
        </div>
    );
};

export default OptionStepper;
