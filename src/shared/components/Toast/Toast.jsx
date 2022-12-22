import "./toast.css";

import { ReactComponent as CloseIcon } from "./static/close.svg";

export default function Toast({
    id,
    render,
    title = "Notification",
    subtitle,
    icon,
    dismissable = true,
    backgroundColor = "#fff",
    color = "#000",
    onDismiss,
}) {
    const handleDismiss = () => {
        onDismiss(id);
    };

    return (
        <div className="toast" style={{ backgroundColor, color }}>
            <div className="toast-content">
                {render ?? (
                    <>
                        <div className="toast-title-row">
                            {icon}
                            <h4 className="toast-title">{title}</h4>
                        </div>
                        {subtitle && (
                            <p className="toast-subtitle">{subtitle}</p>
                        )}
                    </>
                )}
            </div>
            {dismissable && (
                <button className="close-btn" onClick={handleDismiss}>
                    <CloseIcon />
                </button>
            )}
        </div>
    );
}
