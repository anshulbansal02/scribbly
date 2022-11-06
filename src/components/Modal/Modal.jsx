import "./modal.css";

import { createPortal } from "react-dom";

const Modal = ({ isOpen, children, onOutsideClick }) => {
    const handleOutsideClick = (e) => {
        if (e.target === e.currentTarget && onOutsideClick) onOutsideClick();
    };

    return createPortal(
        isOpen ? (
            <div className="modal-overlay" onClick={handleOutsideClick}>
                <div className="modal">{children}</div>
            </div>
        ) : null,
        document.getElementById("portal")
    );
};

export default Modal;
