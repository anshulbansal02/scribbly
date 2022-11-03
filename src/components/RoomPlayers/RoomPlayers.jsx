import "./roomPlayers.css";

import { useAtomValue } from "jotai";

import { Avatar } from "components";

import { roomPlayersAtom } from "atoms";

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
                    <Avatar key={playerId} id={playerId} label={username} />
                ))}
            </div>
        </div>
    );
}
