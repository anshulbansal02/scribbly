import "./input.css";

const Input = ({ className, ...props }) => {
    return <input className={`input-box ${className}`} {...props} />;
};

export default Input;
