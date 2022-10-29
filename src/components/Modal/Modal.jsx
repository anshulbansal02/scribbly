import "./modal.css";

const Modal = ({ isOpen, children, onOutsideClick = () => {} }) => {
    const handleOutsideClick = (e) => {
        if (e.target === e.currentTarget) onOutsideClick();
    };

    return (
        <div
            className={`modal-container ${isOpen ? null : "closed"}`}
            onClick={handleOutsideClick}
        >
            <div className="modal">{children}</div>
        </div>
    );
};

export default Modal;
