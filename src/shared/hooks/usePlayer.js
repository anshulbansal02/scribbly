import { useAtomValue } from "jotai";
import { selectAtom } from "jotai/utils";
import { useCallback } from "react";

import { playersAtom } from "store/atoms/roomAtoms";

export default function usePlayer(playerId) {
    return useAtomValue(
        selectAtom(
            playersAtom,
            useCallback((players) => players[playerId], [])
        )
    );
}
