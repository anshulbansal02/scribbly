import styles from "./Toast.module.css";

import { ReactComponent as CloseIcon } from "./static/close.svg";

export default function Toast({
    id,
    render,
    title = "Toast",
    text,
    icon,
    dismissable = true,
    styles: customStyles,
    onDismiss,
}) {
    return (
        <div className={styles.container} style={customStyles}>
            <div
                className={styles.content}
                style={{ paddingLeft: icon ? "12px" : "18px" }}
            >
                {render || (
                    <>
                        {icon && <div className={styles.icon}>{icon}</div>}
                        <div>
                            <p className={styles.title}>{title}</p>
                            {text && <p className={styles.text}>{text}</p>}
                        </div>
                    </>
                )}
            </div>

            {dismissable && (
                <button
                    className={styles.dismissBtn}
                    onClick={() => onDismiss(id)}
                >
                    <CloseIcon />
                </button>
            )}
        </div>
    );
}
