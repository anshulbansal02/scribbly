import "./message.css";

import { Avatar } from "shared/components";
import { usePlayer } from "shared/hooks";

export default function Message({ userId, textList = [] }) {
    const { username } = usePlayer(userId);

    return (
        <div className="message">
            <Avatar playerId={userId} size={28} />
            <div className="texts">
                {textList.map(({ text, id }) => (
                    <div key={id} className="text-bubble">
                        <p className="text">{text}</p>
                    </div>
                ))}

                <div className="sender-username">
                    <p>{username}</p>
                </div>
            </div>
        </div>
    );
}
