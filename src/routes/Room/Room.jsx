import "./room.css";

import { useAtomValue, useSetAtom } from "jotai";
import { useEffect } from "react";
import { useNavigate } from "react-router";

import { roomIdAtom, roomPlayersAtom } from "atoms/roomAtoms";
import { useSocket } from "contexts/SocketContext";
import IOEvents from "config/events";

import Lobby from "routes/Lobby/Lobby";

export default function Room() {
    const roomId = useAtomValue(roomIdAtom);
    const setPlayersInRoom = useSetAtom(roomPlayersAtom);

    const socket = useSocket();
    const navigate = useNavigate();

    useEffect(() => {
        if (!roomId) {
            navigate("/");
        }
    }, [roomId]);

    useEffect(() => {
        socket.on(IOEvents.ROOM_PLAYER_JOIN, ({ player }) => {
            setPlayersInRoom((players) => [...players, player]);
        });

        socket.on(IOEvents.ROOM_PLAYER_LEAVE, ({ player }) => {
            setPlayersInRoom((players) =>
                players.filter((playerInRoom) => player.id !== playerInRoom.id)
            );
        });

        return () => {
            socket.off(IOEvents.ROOM_PLAYER_JOIN);
            socket.off(IOEvents.ROOM_PLAYER_LEAVE);
        };
    }, [socket]);

    return <Lobby />;
}
