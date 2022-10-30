import "./button.css";

const Button = ({ children, className, ...props }) => {
    return (
        <button className={`btn-block ${className}`} {...props}>
            {children}
        </button>
    );
};

export default Button;
