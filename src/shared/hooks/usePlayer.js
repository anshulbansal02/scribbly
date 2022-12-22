import { useAtomValue, useSetAtom } from "jotai";
import { selectAtom } from "jotai/utils";
import { useCallback, useEffect, useState } from "react";

import useApi from "api";

import roomAtoms from "store/atoms/roomAtoms";

export default function usePlayer(playerId) {
    const [player, setPlayer] = useState({
        id: playerId,
        username: "",
        avatar: "",
        accent: "",
    });

    const cachedPlayerData = useAtomValue(
        selectAtom(
            roomAtoms.players,
            useCallback((players) => players[playerId], [playerId])
        )
    );
    if (!player.username && cachedPlayerData) {
        setPlayer(cachedPlayerData);
    }

    const api = useApi();
    const addPlayerData = useSetAtom(roomAtoms.addPlayerData);
    useEffect(() => {
        async function fetchPlayer() {
            if (!player.username) {
                const playerDto = await api.getPlayer(playerId);
                addPlayerData(playerDto);
            }
        }

        fetchPlayer();
    }, [playerId]);

    return player;
}
