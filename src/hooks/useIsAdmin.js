import { playerAtom, roomAdminIdAtom } from "atoms";
import { useAtomValue } from "jotai";

export default function useIsAdmin() {
    const currentPlayer = useAtomValue(playerAtom);
    const adminId = useAtomValue(roomAdminIdAtom);

    return roomAdminIdAtom ? currentPlayer.id === adminId : false;
}
