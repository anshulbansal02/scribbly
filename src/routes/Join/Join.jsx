import "./join.css";

import { useNavigate, useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import axios from "axios";

import { useSocket } from "contexts/SocketContext";

import IOEvents from "config/events";
import { Button, Input, Page } from "components";
import { useInput } from "hooks";
import { useSetAtom } from "jotai";
import { roomAtom } from "atoms/roomAtoms";
import { playerUsernameAtom } from "atoms/playerAtoms";

const API = process.env.REACT_APP_API_SERVER_URL;

export default function Join() {
    const { roomId } = useParams();
    const usernameInput = useInput();

    const [roomExists, setRoomExists] = useState(null);
    const setRoom = useSetAtom(roomAtom);
    const setPlayerUsername = useSetAtom(playerUsernameAtom);

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
        <Page className="join-view">
            {roomExists ? (
                <div className="room-username">
                    <h4>What username would you give yourself?</h4>
                    <div className="username-input-field">
                        <Input
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
        </Page>
    );
}
