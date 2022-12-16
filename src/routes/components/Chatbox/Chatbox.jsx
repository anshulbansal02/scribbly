import { useEffect } from "react";
import { useInput, useSocket } from "shared/hooks";
import IOEvents from "store/constants/IOEvents";
import "./chatbox.css";
import Message from "./Message";

import { ReactComponent as SendIcon } from "./static/send-fill.svg";

const Chatbox = () => {
    const messageInput = useInput();

    const socket = useSocket();

    useEffect(() => {
        return () => {
            socket.off(IOEvents.CHAT_MESSAGE);
        };
    }, []);

    const handleSend = () => {
        if (messageInput.value) {
            socket.emit(IOEvents.CHAT_MESSAGE, { text: messageInput.value });
        }
    };

    return (
        <div className="chatbox">
            <div className="message-list">
                <Message
                    textList={[
                        { text: "lorem ipsum dolor sit amet.", id: 0 },
                        { text: "rerum necessitatibus", id: 1 },
                    ]}
                />
                <Message
                    userId="abc"
                    textList={[
                        {
                            text: "lipAt vero eos et accusamus et iusto odio dignissimos ducimus quisum",
                            id: 1,
                        },
                    ]}
                />
                <Message
                    userId="ac"
                    textList={[
                        { text: "lorem ipsum dolor sit amet.", id: 0 },
                        { text: "rerum necessitatibus", id: 1 },
                    ]}
                />
                <Message
                    userId="ab"
                    textList={[
                        { text: "lorem ipsum dolor sit amet.", id: 0 },
                        { text: "rerum necessitatibus", id: 1 },
                    ]}
                />
            </div>

            <div className="chat-input">
                <input
                    placeholder="what's your guess?"
                    type="text"
                    {...messageInput}
                ></input>
                <button onClick={handleSend}>
                    <SendIcon />
                </button>
            </div>
        </div>
    );
};

export default Chatbox;
