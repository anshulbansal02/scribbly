import { toastsAtom } from "atoms";
import { useSetAtom } from "jotai";
import { nanoid } from "nanoid";
import stylesConfig from "./toastDefaultStyles";

function toastId() {
    return nanoid(6);
}

const DEFAULT_TIMEOUT = 2500;

export default function useToaster() {
    const setToasts = useSetAtom(toastsAtom);

    function addToQueue(toast) {
        setToasts((toasts) => [...toasts, toast]);
    }

    function dismiss(toastId) {
        setToasts((toasts) => toasts.filter((toast) => toast.id !== toastId));
    }

    function make(defaultConfig) {
        return (config) => {
            if (typeof config !== "object") {
                config = { title: config };
            }
            const newToast = { ...defaultConfig, ...config, id: toastId() };

            addToQueue(newToast);

            if (!config.persistant) {
                setTimeout(() => {
                    dismiss(newToast.id);
                }, config.timeout ?? DEFAULT_TIMEOUT);
            }

            return newToast.id;
        };
    }

    const toasterMethods = {
        toast: make({}),
        error: make(stylesConfig.error),
        warning: make(stylesConfig.warning),
        success: make(stylesConfig.success),
        info: make(stylesConfig.info),
        notification: make(stylesConfig.notification),
        dismiss,
    };

    return toasterMethods;
}
