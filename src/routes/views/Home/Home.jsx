import "./home.css";

import { useState, useEffect } from "react";
import { useNavigate } from "react-router";
import { useSetAtom } from "jotai";

import { useInput, useToggle, useSocket } from "shared/hooks";

import { playerUsernameAtom } from "store/atoms/playerAtoms";
import { roomAtom } from "store/atoms/roomAtoms";
import IOEvents from "store/constants/IOEvents";

import { Modal, Page, Button, Input } from "shared/components";

export default function Home() {
    // UI State
    const usernameInput = useInput();
    const [usernameInputError, setUsernameInputError] = useState("");
    const roomCodeInput = useInput();
    const [roomCodeInputError, setRoomCodeInputError] = useState("");
    const [roomCodeModalOpen, toggleRoomCodeModal] = useToggle();

    const socket = useSocket();
    const navigate = useNavigate();

    // Atoms State
    const setRoom = useSetAtom(roomAtom);
    const setPlayerUsername = useSetAtom(playerUsernameAtom);

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

    // Handlers
    const handlePlayNow = () => {
        // Implementation Deferred
    };

    const handleNewRoom = () => {
        const { value: username } = usernameInput;
        if (!username) {
            setUsernameInputError("Please enter a valid username.");
            setTimeout(() => setUsernameInputError(""), 1500);
            return;
        }
        // Request room creation
        socket.emit(IOEvents.ROOM_CREATE, { username });
    };

    const handleJoinRoomModal = () => {
        if (!usernameInput.value) {
            setUsernameInputError("Please enter a valid username.");
            setTimeout(() => setUsernameInputError(""), 1500);
            return;
        }
        toggleRoomCodeModal();
    };

    const handleRoomJoin = () => {
        const { value: roomId } = roomCodeInput;
        const { value: username } = usernameInput;
        if (!/[a-z]{6}/.test(roomId)) {
            setRoomCodeInputError("Please enter a valid room code.");
            setTimeout(() => setRoomCodeInputError(""), 1500);
            return;
        }
        // Request room join
        socket.emit(IOEvents.ROOM_JOIN, {
            roomId,
            username,
        });
    };

    return (
        <Page className="home-page">
            <div className="header">
                <h3 className="title">Scribbly</h3>
                <h5 className="sub-title">
                    Realtime multiplayer online pictionary
                </h5>
            </div>

            <div className="home-ctas">
                <Input
                    type="text"
                    placeholder="What would you like to call yourself?"
                    spellCheck="false"
                    error={usernameInputError}
                    {...usernameInput}
                />
                <Button onClick={handlePlayNow} className="green">
                    Play Now
                </Button>
                <Button onClick={handleNewRoom}>New Room</Button>
                <Button onClick={handleJoinRoomModal}>Join Room</Button>
            </div>

            <Modal
                isOpen={roomCodeModalOpen}
                onOutsideClick={toggleRoomCodeModal}
                className="room-code-modal"
            >
                <h4>Hello {usernameInput.value}, What's your room code?</h4>
                <Input
                    type="text"
                    placeholder="Room Code"
                    spellCheck="false"
                    error={roomCodeInputError}
                    {...roomCodeInput}
                    autoFocus
                />
                <Button onClick={handleRoomJoin} className="green">
                    Lessgo
                </Button>
                <Button onClick={toggleRoomCodeModal}>Cancel</Button>
            </Modal>
        </Page>
    );
}
