import { forwardRef } from "react";
import "./input.css";

import { ReactComponent as ErrorIcon } from "./static/error.svg";

const Input = forwardRef(({ className, error, ...props }, ref) => {
    return (
        <div className="input-container">
            <input
                className={`input-box ${className} ${error ? "error" : ""}`}
                {...props}
            />
            {error && (
                <p className="input-caption">
                    <ErrorIcon /> {error}
                </p>
            )}
        </div>
    );
});

export default Input;
