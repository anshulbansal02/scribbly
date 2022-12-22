import styles from "./Avatar.module.css";

import { usePlayer } from "shared/hooks";
import { useState } from "react";

const fallbackAvatarSrc =
    "https://avatars.dicebear.com/api/croodles-neutral/your-custom-seed.svg";
const fallbackAccentColor = "#f0f0f0";

const Avatar = ({ playerId, size = 48, withUsername }) => {
    const [imageSrc, setImageSrc] = useState();
    const player = usePlayer(playerId);

    return (
        <div className={styles.avatar}>
            <div
                className={styles.imageWrapper}
                style={{
                    backgroundColor: player.accent ?? fallbackAccentColor,
                    width: `${size}px`,
                    height: `${size}px`,
                    borderRadius: `${size}px`,
                }}
            >
                <img
                    className={styles.image}
                    draggable="false"
                    src={imageSrc || player.avatar || ""}
                    alt={`${player.username || "Anon"}'s Avatar`}
                    onError={() => setImageSrc(fallbackAvatarSrc)}
                />
            </div>
            {withUsername ? (
                <p className={styles.username}>{player.username}</p>
            ) : null}
        </div>
    );
};

export default Avatar;
