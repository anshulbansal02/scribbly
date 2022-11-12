import "./avatar.css";

import { useEffect, useState } from "react";

import { getImageAccent } from "utils";

const Avatar = ({ id, size = 48, label }) => {
    const [accent, setAccent] = useState("#f0f0f0");

    useEffect(() => {
        (async () => {
            const color = await getImageAccent(
                `https://avatars.dicebear.com/api/bottts/${id}.svg`
            );
            setAccent(color);
        })();
    });

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
                    src={`https://avatars.dicebear.com/api/bottts/${id}.svg`}
                    alt={label}
                />
            </div>
            {label && <p className="avatar-label">{label}</p>}
        </div>
    );
};

export default Avatar;
