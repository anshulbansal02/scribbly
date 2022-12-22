import "./joinRoom.css";

import { useNavigate, useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import { useSetAtom } from "jotai";
import axios from "axios";

import { useSocket, useInput } from "shared/hooks";
import roomAtoms from "store/atoms/roomAtoms";
import playerAtoms from "store/atoms/playerAtoms";
import IOEvents from "store/constants/IOEvents";

import { Button, Field, Page } from "shared/components";

const API = process.env.REACT_APP_API_SERVER_URL;

export default function Join() {
    const { roomId } = useParams();
    const usernameInput = useInput();

    const [roomExists, setRoomExists] = useState(null);
    const setRoom = useSetAtom(roomAtoms.room);
    const setPlayerUsername = useSetAtom(playerAtoms.username);

    const navigate = useNavigate();
    const socket = useSocket();

    const handleRoomJoin = () => {
        const { value: username } = usernameInput;

        // Request room join
        socket.emit(IOEvents.ROOM_JOIN, {
            roomId,
            username,
        });
    };

    useEffect(() => {
        async function fetchRoomStatus() {
            const res = await axios.get(`${API}/api/room/exists/${roomId}`);
            setRoomExists(res.data.exists);
        }
        fetchRoomStatus();
    }, []);

    useEffect(() => {
        socket.on(IOEvents.ROOM_JOIN, ({ room }) => {
            setPlayerUsername(usernameInput.value);
            setRoom(room);

            navigate("/game");
        });

        return () => {
            socket.off(IOEvents.ROOM_JOIN);
        };
    }, [socket]);

    return (
        <div className="page join-view">
            {roomExists ? (
                <div className="room-username">
                    <h4>What username would you give yourself?</h4>
                    <div className="username-input-field">
                        <Field
                            autoFocus
                            placeholder="Username"
                            {...usernameInput}
                        />
                        <Button className="green" onClick={handleRoomJoin}>
                            Lessgo
                        </Button>
                    </div>
                </div>
            ) : (
                <div className="room-error">
                    <h3>
                        Uh oh! Room with code{" "}
                        <span>{roomId.toUpperCase()}</span> doesn't exist.
                    </h3>
                    <p>
                        Please check the room invite url or the room code. It
                        may be incorrect or the room may have been closed.
                    </p>
                    <Button onClick={() => navigate("/")}>Back To Home</Button>
                </div>
            )}
        </div>
    );
}
