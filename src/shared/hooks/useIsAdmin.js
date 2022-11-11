import { useAtomValue } from "jotai";

import { playerIdAtom } from "store/atoms/playerAtoms";
import { roomAdminIdAtom } from "store/atoms/roomAtoms";

export default function useIsAdmin() {
    const playerId = useAtomValue(playerIdAtom);
    const adminId = useAtomValue(roomAdminIdAtom);

    return roomAdminIdAtom && playerId === adminId;
}
