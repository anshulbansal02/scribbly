import { atom } from "jotai";
import { gameSettingsOptions } from "config";

// Player Atoms
const playerAtom = atom({});

// Room Atoms
const roomPlayersAtom = atom([]);
const roomAdminIdAtom = atom(null);
const roomIdAtom = atom(null);
const roomJoinURLAtom = atom((get) => `scribbly.app/join/${get(roomIdAtom)}`);

const gameSettingsAtom = atom({
    drawingTime: gameSettingsOptions.drawingTime.default,
    rounds: gameSettingsOptions.rounds.default,
    difficulty: gameSettingsOptions.difficulty.default,
});

// Misc Atoms
const toastsAtom = atom([]);

export {
    roomPlayersAtom,
    playerAtom,
    roomAdminIdAtom,
    gameSettingsAtom,
    roomIdAtom,
    roomJoinURLAtom,
    toastsAtom,
};
