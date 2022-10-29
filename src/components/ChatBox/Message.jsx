import "./message.css";

const Message = ({ userId, message }) => {
    return <div className="message">{message}</div>;
};

export default Message;
