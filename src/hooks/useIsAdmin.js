import { playerIdAtom } from "atoms/playerAtoms";
import { roomAdminIdAtom } from "atoms/roomAtoms";

import { useAtomValue } from "jotai";

export default function useIsAdmin() {
    const playerId = useAtomValue(playerIdAtom);
    const adminId = useAtomValue(roomAdminIdAtom);

    return roomAdminIdAtom && playerId === adminId;
}
