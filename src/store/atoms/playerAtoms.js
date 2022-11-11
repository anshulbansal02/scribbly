import { atom } from "jotai";

// Atoms
const playerIdAtom = atom(null);
const playerUsernameAtom = atom(null);

// Molecules
const playerAtom = atom(
    (get) => ({ id: get(playerIdAtom), username: get(playerUsernameAtom) }),
    (get, set, playerData) => {
        const { id, username } = playerData;
        if (id !== null) set(playerIdAtom, id);
        if (username !== null) set(playerUsernameAtom, username);
    }
);

export { playerAtom, playerIdAtom, playerUsernameAtom };
