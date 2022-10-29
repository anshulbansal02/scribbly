import "./chatbox.css";
import { useState, useEffect, useContext } from "react";

import SocketContext from "contexts/SocketContext";

const ChatBox = () => {
    const socket = useContext(SocketContext);

    const [messageValue, setMessageValue] = useState("");
    const [messageList, setMessageList] = useState([]);

    useEffect(() => {
        socket.on("chat-message", (data) => {
            setMessageList([...messageList, data]);
        });

        return () => {
            socket.off("chat-message");
        };
    }, [messageList, socket]);

    const sendMessage = () => {
        socket.emit("chat-message", messageValue);
    };

    const handleMessageChange = (e) => {
        setMessageValue(e.target.value);
    };

    return (
        <div>
            <div className="messages">
                {messageList.map((msg) => (
                    <div key={msg}>{msg}</div>
                ))}
            </div>

            <input
                value={messageValue}
                onChange={handleMessageChange}
                type="text"
                placeholder="Your message"
            />
            <button onClick={sendMessage}>Send</button>
        </div>
    );
};

export default ChatBox;

/*
Message Structure 
{
    userId, messageId, message
}


*/
