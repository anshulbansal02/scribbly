import styles from "./CodeInput.module.css";
import { useEffect, useRef, useState } from "react";

const KEY = {
    BACKSPACE: 8,
};

const CodeInput = ({ length, type, onChange, value, ...props }) => {
    const [chars, setChars] = useState(value?.split("") || []);
    const inputsRef = useRef([]);

    const handlePaste = (e) => {
        const pastedText = (e.clipboardData ?? window.clipboardData).getData(
            "text"
        );
    };

    useEffect(() => {
        const code = chars.join("");
        onChange?.call(null, { target: { value: code } });
    }, [chars]);

    const handleKeyDown = (e) => {
        if (e.metaKey) return;
        e.preventDefault();

        const inputId = +e.target.id;

        if (e.which === KEY.BACKSPACE) {
            setChars((oldChars) => {
                const chars = [...oldChars];
                chars[inputId] = null;
                return chars;
            });
            inputsRef.current[inputId - 1]?.focus();
            return;
        }

        const char = String.fromCharCode(e.keyCode);
        if (char.match(/[a-zA-Z0-9]/g)) {
            setChars((oldChars) => {
                const chars = [...oldChars];
                chars[inputId] = char;
                return chars;
            });
            inputsRef.current[inputId + 1]?.focus();
        }
    };

    return (
        <div className={styles.codeInput}>
            {[...Array(length)].map((_, i) => (
                <input
                    key={i}
                    id={i}
                    maxLength={1}
                    value={chars[i] ?? ""}
                    className={styles.charInput}
                    onPaste={handlePaste}
                    onKeyDown={handleKeyDown}
                    ref={(el) => (inputsRef.current[i] = el)}
                    onChange={() => {}}
                />
            ))}
        </div>
    );
};

export default CodeInput;
