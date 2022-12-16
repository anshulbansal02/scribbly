import { atom } from "jotai";

const roomAtoms = {
    // Atoms
    id: atom(null),
    adminId: atom(null),
    players: atom({}),
    playerIdsInRoom: atom([]),
    settings: atom({}),

    // Molecules
    room: atom(
        (get) => ({
            id: get(roomAtoms.id),
            adminId: get(roomAtoms.adminId),
            playerIds: get(roomAtoms.playerIdsInRoom),
            settings: get(roomAtoms.settings),
        }),
        (get, set, roomDto) => {
            const { id, adminId, playerIds, settings } = roomDto;
            set(roomAtoms.id, id);
            set(roomAtoms.adminId, adminId);
            set(roomAtoms.settings, settings);
            set(roomAtoms.playerIdsInRoom, playerIds);
        }
    ),

    // Derived & Actions
    addPlayerIdToRoom: atom(null, (get, set, playerId) => {
        set(roomAtoms.playerIdsInRoom, [
            ...get(roomAtoms.playerIdsInRoom),
            playerId,
        ]);
    }),
    removePlayerIdFromRoom: atom(null, (get, set, playerId) => {
        set(
            roomAtoms.playerIdsInRoom,
            get(roomAtoms.playerIdsInRoom).filter(
                (playerIdInRoom) => playerIdInRoom !== playerId
            )
        );
    }),

    addPlayerData: atom(null, (get, set, playerDto) => {
        const { id, username, avatar } = playerDto;

        set(roomAtoms.players, {
            ...get(roomAtoms.players),
            id: {
                id,
                username,
                avatar: avatar.imageURL,
                accent: avatar.accentColor,
            },
        });
    }),

    joinURL: atom((get) => `${window.location.host}/join/${get(roomAtoms.id)}`),

    reset: atom(null, (get, set, _) => {
        set(roomAtoms.id, null);
        set(roomAtoms.adminId, null);
        set(roomAtoms.players, []);
        set(roomAtoms.settings, {});
    }),
};

// Action Atoms

export default roomAtoms;
