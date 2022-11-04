import "./toastContainer.css";

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

    return (
        <div className="toast-container">
            {toastsList.map((toastConfig) => (
                <Toast
                    key={toastConfig.id}
                    {...toastConfig}
                    onDismiss={handleToastDismiss}
                />
            ))}
        </div>
    );
}
