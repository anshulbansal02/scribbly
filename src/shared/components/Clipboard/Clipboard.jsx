import styles from "./Clipboard.module.css";

import { useState } from "react";

import { ReactComponent as ShareIcon } from "./static/share.svg";
import { ReactComponent as CopyIcon } from "./static/copy.svg";
import { ReactComponent as TickIcon } from "./static/tick.svg";

const Clipboard = ({ text }) => {
    const [isCopied, setIsCopied] = useState(false);

    const handleShare = () => {
        navigator.share(text);
    };

    const handleCopy = async () => {
        await navigator.clipboard.writeText(text);
        setIsCopied(true);
        setTimeout(() => {
            setIsCopied(false);
        }, 1000);
    };

    return (
        <div className={styles.container}>
            <p className={styles.text}>{text}</p>
            <div className={styles.actions}>
                {navigator.share ? (
                    <button className={styles.btn} onClick={handleShare}>
                        <ShareIcon />
                    </button>
                ) : null}
                <button className={styles.btn} onClick={handleCopy}>
                    {isCopied ? <TickIcon /> : <CopyIcon />}
                </button>
            </div>
        </div>
    );
};

export default Clipboard;
