import "./toastContainer.css";

import { createPortal } from "react-dom";
import { useAtomValue, useSetAtom } from "jotai";

import { toastsAtom, popToastAtom } from "store/atoms/toastAtoms";

import { Toast } from "shared/components";

export default function ToastContainer() {
    const toastsList = useAtomValue(toastsAtom);
    const popToast = useSetAtom(popToastAtom);

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
