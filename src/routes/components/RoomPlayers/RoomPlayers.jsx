import "./roomPlayers.css";

import { useAtomValue } from "jotai";

import roomAtoms from "store/atoms/roomAtoms";

import { Avatar } from "shared/components";

export default function RoomPlayers() {
    const playerIdsInRoom = useAtomValue(roomAtoms.playerIdsInRoom);

    return (
        <div className="room-players">
            <h4>
                {playerIdsInRoom.length}{" "}
                {playerIdsInRoom.length > 1 ? "Players" : "Player"} In The Room
            </h4>
            <div className="players-list">
                {playerIdsInRoom.map((playerId) => (
                    <Avatar
                        key={playerId}
                        playerId={playerId}
                        withUsername
                        size={56}
                    />
                ))}
            </div>
        </div>
    );
}
