import "./roomPlayers.css";

import { useAtomValue } from "jotai";

import { roomPlayersAtom } from "store/atoms/roomAtoms";

import { Avatar } from "shared/components";

export default function RoomPlayers() {
    const playersInRoom = useAtomValue(roomPlayersAtom);

    return (
        <div className="room-players">
            <h4>
                {playersInRoom.length}{" "}
                {playersInRoom.length > 1 ? "Players" : "Player"} In The Room
            </h4>
            <div className="players-list">
                {playersInRoom.map(({ id: playerId, username }) => (
                    <Avatar
                        key={playerId}
                        id={playerId}
                        withUsername
                        size={56}
                    />
                ))}
            </div>
        </div>
    );
}
