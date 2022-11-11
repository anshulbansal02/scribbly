import "./button.css";

const Button = ({ children, className, disabled, ...props }) => {
    return (
        <button
            className={`btn-block ${className} ${disabled && "disabled"}`}
            {...props}
        >
            {children}
        </button>
    );
};

export default Button;
