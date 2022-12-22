import styles from "./Modal.module.css";

import { createPortal } from "react-dom";
import classNames from "classnames";

const portal = document.getElementById("portal");

const Modal = ({ isOpen, onOutsideClick, className, children }) => {
    return createPortal(
        isOpen && (
            <div
                className={styles.overlay}
                onClick={(e) => {
                    if (onOutsideClick && e.target === e.currentTarget)
                        onOutsideClick();
                }}
            >
                <div className={classNames(styles.modal, className)}>
                    {children}
                </div>
            </div>
        ),
        portal
    );
};

export default Modal;
