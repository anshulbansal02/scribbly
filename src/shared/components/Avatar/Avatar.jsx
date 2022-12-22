import "./avatar.css";

import { usePlayer } from "shared/hooks";

const Avatar = ({ playerId, size = 48, withUsername }) => {
    const player = usePlayer(playerId);

    return (
        <div className="avatar">
            <div
                className="avatar-img-container"
                style={{
                    backgroundColor: player.accent || "#f0f0f0",
                    width: `${size}px`,
                    height: `${size}px`,
                    borderRadius: `${size}px`,
                }}
            >
                <img
                    className="avatar-img"
                    draggable="false"
                    src={player.avatar}
                    alt={`${player.username}'s Avatar`}
                />
            </div>
            {withUsername && <p className="avatar-label">{player.username}</p>}
        </div>
    );
};

export default Avatar;
