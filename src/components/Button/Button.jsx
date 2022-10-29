import "./button.css";

const Button = ({ children, ...props }) => {
    return (
        <button className="btn-block" {...props}>
            {children}
        </button>
    );
};

export default Button;
