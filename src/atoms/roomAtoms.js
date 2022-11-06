import { atom } from "jotai";

import { playerUsernameAtom } from "./playerAtoms";

// Atoms
const roomIdAtom = atom(null);
const roomAdminIdAtom = atom(null);
const roomPlayersAtom = atom([]);

const gameSettingsAtom = atom({});

// Molecules (Derived Atoms)
const roomAtom = atom(
    (get) => ({
        id: get(roomIdAtom),
        adminId: get(roomAdminIdAtom),
        players: get(roomPlayersAtom),
        settings: get(gameSettingsAtom),
    }),
    (get, set, roomData) => {
        const { id, adminId, players, settings } = roomData;
        set(roomIdAtom, id);
        set(roomAdminIdAtom, adminId);
        set(roomPlayersAtom, players);
        set(gameSettingsAtom, settings);
    }
);

const roomJoinURLAtom = atom(
    (get) => `${window.location.host}/join/${get(roomIdAtom)}`
);

// Action Atoms
const resetRoomAtom = atom(null, (get, set, update) => {
    set(roomIdAtom, null);
    set(roomAdminIdAtom, null);
    set(roomPlayersAtom, []);
    set(playerUsernameAtom, null);
});

export {
    roomAtom,
    roomIdAtom,
    roomAdminIdAtom,
    roomPlayersAtom,
    gameSettingsAtom,
    roomJoinURLAtom,
    resetRoomAtom,
};
