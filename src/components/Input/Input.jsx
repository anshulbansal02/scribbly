import "./input.css";

import { ReactComponent as ErrorIcon } from "./error.svg";

const Input = ({ className, error, ...props }) => {
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
};

export default Input;
