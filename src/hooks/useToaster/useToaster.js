import { pushToastAtom, popToastAtom } from "atoms/toastAtoms";
import { useSetAtom } from "jotai";
import { nanoid } from "nanoid";
import stylesConfig from "./toastDefaultStyles";

function toastId() {
    return nanoid(6);
}

const DEFAULT_TIMEOUT = 2500;

export default function useToaster() {
    const pushToast = useSetAtom(pushToastAtom);
    const popToast = useSetAtom(popToastAtom);

    function make(defaultConfig) {
        return (config) => {
            if (typeof config !== "object") {
                config = { title: config };
            }
            const newToast = { ...defaultConfig, ...config, id: toastId() };

            pushToast(newToast);

            if (!config.persistant) {
                setTimeout(() => {
                    popToast(newToast.id);
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
        dismiss: popToast,
    };

    return toasterMethods;
}
