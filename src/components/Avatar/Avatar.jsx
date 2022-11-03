import "./avatar.css";

const Avatar = ({ id, label }) => {
    return (
        <div className="avatar">
            <div className="avatar-img-container">
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
