import "./toastContainer.css";

import { createPortal } from "react-dom";

import { useAtom } from "jotai";
import { toastsAtom } from "atoms";

import Toast from "../Toast/Toast";

export default function ToastContainer() {
    const [toastsList, setToastsList] = useAtom(toastsAtom);

    const handleToastDismiss = (toastId) => {
        setToastsList((toasts) =>
            toasts.filter((toast) => toast.id !== toastId)
        );
    };

    return createPortal(
        <div className="toast-container">
            {toastsList.map((toastConfig) => (
                <Toast
                    key={toastConfig.id}
                    {...toastConfig}
                    onDismiss={handleToastDismiss}
                />
            ))}
        </div>,
        document.getElementById("portal")
    );
}
