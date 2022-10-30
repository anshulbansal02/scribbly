import "./avatar.css";
import avatars from "./avatars";

const Avatar = ({ label }) => {
    return (
        <div className="avatar">
            <div className="avatar-img-container">
                <img
                    className="avatar-img"
                    src={avatars.avatar1.img}
                    alt={avatars.avatar1.alt}
                    draggable="false"
                />
            </div>
            {label && <p className="avatar-label">{label}</p>}
        </div>
    );
};

export default Avatar;
