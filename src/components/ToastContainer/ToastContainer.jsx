import "./toastContainer.css";

import { createPortal } from "react-dom";
import { useAtomValue, useAtom } from "jotai";

import { toastsAtom, popToastAtom } from "atoms/toastAtoms";

import Toast from "../Toast/Toast";

export default function ToastContainer() {
    const toastsList = useAtomValue(toastsAtom);
    const popToast = useAtom(popToastAtom);

    const handleToastDismiss = (toastId) => {
        popToast(toastId);
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
