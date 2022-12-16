import { atom } from "jotai";

// Atoms

const playerAtoms = {
    id: atom(null),
    username: atom(null),
    avatar: atom(null),
    accent: atom(null),

    player: atom(
        (get) => {
            return {
                id: get(playerAtoms.id),
                username: get(playerAtoms.username),
                avatar: get(playerAtoms.avatar),
                accent: get(playerAtoms.accent),
            };
        },
        (get, set, playerDto) => {
            const { id, username, avatar } = playerDto;

            if (id !== null) set(playerAtoms.id, id);
            if (username !== null) set(playerAtoms.username, username);
            if (avatar.imageURI !== null)
                set(playerAtoms.avatar, avatar.imageURI);
            if (avatar.accentColor !== null)
                set(playerAtoms.accent, avatar.accentColor);
        }
    ),

    reset: atom(null, (get, set, update) => {
        set(playerAtoms.id, null);
        set(playerAtoms.username, null);
        set(playerAtoms.avatar, null);
        set(playerAtoms.accent, null);
    }),
};

export default playerAtoms;
