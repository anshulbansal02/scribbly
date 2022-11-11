import "./textAction.css";

import { useState } from "react";

import { ReactComponent as ShareIcon } from "./static/share.svg";
import { ReactComponent as CopyIcon } from "./static/copy.svg";
import { ReactComponent as TickIcon } from "./static/tick.svg";

const TextAction = ({ text }) => {
    const [isCopied, setIsCopied] = useState(false);

    const handleShare = () => {
        navigator.share(text);
    };

    const handleCopy = async () => {
        await navigator.clipboard.writeText(text);
        setIsCopied(true);
        setTimeout(() => {
            setIsCopied(false);
        }, 500);
    };

    return (
        <div className="text-action">
            <p className="text">{text}</p>
            <div className="actions">
                {navigator.share ? (
                    <button className="btn-icon" onClick={handleShare}>
                        <ShareIcon />
                    </button>
                ) : null}
                <button className="btn-icon" onClick={handleCopy}>
                    {isCopied ? <TickIcon /> : <CopyIcon />}
                </button>
            </div>
        </div>
    );
};

export default TextAction;
