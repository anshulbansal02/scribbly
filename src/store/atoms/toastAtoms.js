import { atom } from "jotai";

const toastsAtom = atom([]);

const pushToastAtom = atom(null, (get, set, toast) => {
    set(toastsAtom, [...get(toastsAtom), toast]);
});

const popToastAtom = atom(null, (get, set, toastId) => {
    set(
        toastsAtom,
        get(toastsAtom).filter((toast) => toast.id !== toastId)
    );
});

export { toastsAtom, pushToastAtom, popToastAtom };
