import "./avatar.css";

import { useEffect, useState } from "react";

import { getImageAccent } from "utils";
import { usePlayer } from "shared/hooks";

const Avatar = ({ playerId, size = 48, withUsername }) => {
    const AVATAR_SVG = `https://avatars.dicebear.com/api/bottts/${playerId}.svg`;

    const [accent, setAccent] = useState("#f0f0f0");
    const player = usePlayer(playerId);

    useEffect(() => {
        (async () => {
            const color = await getImageAccent(AVATAR_SVG);
            setAccent(color);
        })();
    }, [playerId]);

    return (
        <div className="avatar">
            <div
                className="avatar-img-container"
                style={{
                    backgroundColor: accent,
                    width: `${size}px`,
                    height: `${size}px`,
                    borderRadius: `${size}px`,
                }}
            >
                <img
                    className="avatar-img"
                    draggable="false"
                    src={AVATAR_SVG}
                    alt={player.username}
                />
            </div>
            {withUsername && <p className="avatar-label">{player.username}</p>}
        </div>
    );
};

export default Avatar;
