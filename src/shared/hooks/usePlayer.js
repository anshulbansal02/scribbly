import { useAtomValue, useSetAtom } from "jotai";
import { selectAtom } from "jotai/utils";
import { useCallback, useEffect, useState } from "react";

import useApi from "api";

import roomAtoms from "store/atoms/roomAtoms";

export default function usePlayer(playerId) {
    const [player, setPlayer] = useState(null);
    const addPlayerData = useSetAtom(roomAtoms.addPlayerData);
    const cachedPlayerData = useAtomValue(
        selectAtom(
            roomAtoms.players,
            useCallback((players) => players[playerId], [playerId])
        )
    );
    const api = useApi();

    if (cachedPlayerData) {
        setPlayer(cachedPlayerData);
    }

    useEffect(() => {
        async function fetchPlayer() {
            if (!player) {
                const playerDto = await api.getPlayer(playerId);
                addPlayerData(playerDto);
            }
        }

        fetchPlayer();
    });

    return (
        player ?? {
            id: playerId,
            username: "",
            avatar: "",
            accent: "",
        }
    );
}
