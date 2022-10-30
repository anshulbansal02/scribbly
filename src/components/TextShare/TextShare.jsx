import { useState } from "react";

import "./textshare.css";

import { ReactComponent as ShareIcon } from "./share.svg";
import { ReactComponent as CopyIcon } from "./copy.svg";
import { ReactComponent as TickIcon } from "./tick.svg";

const TextShare = ({ text }) => {
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
        <div className="copy-text-container">
            <p className="text">{text}</p>
            <div className="btn-group">
                <button className="btn-icon" onClick={handleShare}>
                    <ShareIcon />
                </button>
                <button className="btn-icon" onClick={handleCopy}>
                    {isCopied ? <TickIcon /> : <CopyIcon />}
                </button>
            </div>
        </div>
    );
};

export default TextShare;
