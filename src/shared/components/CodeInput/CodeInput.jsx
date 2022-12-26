import styles from "./CodeInput.module.css";
import { useEffect, useRef, useState } from "react";
import classNames from "classnames";

const KEY = {
    BACKSPACE: 8,
    ARROW_LEFT: 37,
    ARROW_RIGHT: 39,
};

const CodeInput = ({
    id,
    length,
    type,
    onChange,
    value,
    pasteParser,
    className,
    disabled,
    ...props
}) => {
    if (!id) throw new Error("CodeInput 'id' prop is required.");

    const [chars, setChars] = useState(value?.split("") || []);
    const inputsRef = useRef([]);

    useEffect(() => {
        const code = chars.join("");
        onChange?.call(null, { target: { value: code } });
    }, [chars]);

    const handlePaste = (e) => {
        const pastedText = (e.clipboardData ?? window.clipboardData).getData(
            "text"
        );

        const parsed = ((pasteParser && pasteParser(pastedText)) || pastedText)
            .slice(0, length)
            .split("");

        setChars(parsed);

        inputsRef.current[length - 1]?.focus();
    };

    const handleKeyDown = (e) => {
        if (e.metaKey) return;
        e.preventDefault();

        const inputId = +e.target.id.split("_").at(-1);
        const char = String.fromCharCode(e.keyCode);

        if (e.which === KEY.ARROW_LEFT) {
            inputsRef.current[inputId - 1]?.focus();
        } else if (e.which === KEY.ARROW_RIGHT) {
            inputsRef.current[inputId + 1]?.focus();
        } else if (e.which === KEY.BACKSPACE) {
            setChars((oldChars) => {
                const chars = [...oldChars];
                chars[inputId] = null;
                return chars;
            });
            inputsRef.current[inputId - 1]?.focus();
        } else if (char.match(/[a-zA-Z0-9]/g)) {
            setChars((oldChars) => {
                const chars = [...oldChars];
                chars[inputId] = char;
                return chars;
            });
            inputsRef.current[inputId + 1]?.focus();
        }
    };

    return (
        <div className={classNames(styles.codeInput, className)}>
            {[...Array(length)].map((_, i) => (
                <input
                    key={`${id}_${i}`}
                    id={`${id}_${i}`}
                    maxLength={1}
                    value={chars[i] ?? ""}
                    className={styles.charInput}
                    onPaste={handlePaste}
                    onKeyDown={handleKeyDown}
                    ref={(el) => (inputsRef.current[i] = el)}
                    onChange={() => {}}
                    disabled={disabled}
                />
            ))}
        </div>
    );
};

export default CodeInput;
