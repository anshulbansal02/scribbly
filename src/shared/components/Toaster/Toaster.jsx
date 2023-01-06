import styles from "./Toaster.module.css";

import { createPortal } from "react-dom";
import { useAtomValue, useSetAtom } from "jotai";
import { motion, AnimatePresence } from "framer-motion";

import { toastsAtom, popToastAtom } from "store/atoms/toastAtoms";

import { Toast } from "shared/components";
import classNames from "classnames";

export default function Toaster() {
    const toastsList = useAtomValue(toastsAtom);
    const popToast = useSetAtom(popToastAtom);

    const handleToastDismiss = (toastId) => {
        popToast(toastId);
    };

    return createPortal(
        <div className={styles.container}>
            <motion.div
                className={classNames(
                    styles.stack,
                    styles.bottom,
                    styles.right
                )}
            >
                <AnimatePresence initial={false}>
                    {toastsList.map((toastConfig) => (
                        <motion.div
                            key={toastConfig.id}
                            layout
                            initial={{ opacity: 0.5, y: 48, scale: 0.8 }}
                            animate={{ opacity: 1, y: 0, scale: 1 }}
                            exit={{
                                opacity: 0,
                                scale: 0.7,
                                transition: { duration: 0.1 },
                            }}
                        >
                            <Toast
                                {...toastConfig}
                                onDismiss={handleToastDismiss}
                            />
                        </motion.div>
                    ))}
                </AnimatePresence>
            </motion.div>
        </div>,
        document.getElementById("portal")
    );
}
