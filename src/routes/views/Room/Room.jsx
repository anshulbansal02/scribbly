import { useAtomValue, useSetAtom } from "jotai";
import { useEffect } from "react";
import { useNavigate } from "react-router";

import roomAtoms from "store/atoms/roomAtoms";
import { useSocket } from "shared/hooks";
import IOEvents from "store/constants/IOEvents.js";

import { LobbyView } from "routes/views";

import "./room.css";

export default function Room() {
    const roomId = useAtomValue(roomAtoms.id);

    const socket = useSocket();
    const navigate = useNavigate();

    useEffect(() => {
        if (!roomId) {
            navigate("/");
        }
    }, [roomId]);

    useEffect(() => {
        socket.on(IOEvents.ROOM_PLAYER_JOIN, ({ player }) => {});

        socket.on(IOEvents.ROOM_PLAYER_LEAVE, ({ player }) => {});

        return () => {
            socket.off(IOEvents.ROOM_PLAYER_JOIN);
            socket.off(IOEvents.ROOM_PLAYER_LEAVE);
        };
    }, [socket]);

    return <LobbyView />;
}
