import { useAtomValue } from "jotai";

import playerAtoms from "store/atoms/playerAtoms";
import roomAtoms from "store/atoms/roomAtoms";

export default function useIsAdmin() {
    const playerId = useAtomValue(playerAtoms.id);
    const adminId = useAtomValue(roomAtoms.adminId);

    return playerId === adminId;
}
