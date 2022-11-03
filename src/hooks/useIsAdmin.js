import { playerAtom, roomOwnerAtom } from "atoms";
import { useAtomValue } from "jotai";

export default function useIsAdmin() {
    const currentPlayer = useAtomValue(playerAtom);
    const currentAdmin = useAtomValue(roomOwnerAtom);

    return currentAdmin && currentPlayer
        ? currentPlayer.id === currentAdmin.id
        : false;
}
