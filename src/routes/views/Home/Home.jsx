import "./home.css";

import { useState, useEffect, useRef } from "react";
import { useNavigate } from "react-router";
import { useAtom, useSetAtom } from "jotai";

import { useInput, useToggle, useSocket } from "shared/hooks";

import playerAtoms from "store/atoms/playerAtoms";
import authAtoms from "store/atoms/authAtoms";
import roomAtoms from "store/atoms/roomAtoms";
import IOEvents from "store/constants/IOEvents";

import { Modal, Page, Button, Input } from "shared/components";
import useApi from "api";

export default function Home() {
    // UI State
    const usernameInput = useInput();
    const [usernameInputError, setUsernameInputError] = useState("");
    const roomCodeInput = useInput();
    const [roomCodeInputError, setRoomCodeInputError] = useState("");
    const [roomCodeModalOpen, toggleRoomCodeModal] = useToggle();

    const api = useApi();
    const socket = useSocket();

    // Atoms
    const setRoom = useSetAtom(roomAtoms.room);
    const setPlayer = useSetAtom(playerAtoms.player);
    const setAssociationToken = useSetAtom(authAtoms.associationToken);

    // Handlers
    const handlePlayNow = () => {
        // Implementation Deferred
    };

    const handleNewRoom = async () => {
        const { value: username } = usernameInput;
        if (!username) {
            setUsernameInputError("Please enter a valid username.");
            setTimeout(() => setUsernameInputError(""), 1500);
            return;
        }

        const { player, token } = await api.createPlayer(username);
        setPlayer(player);
        setAssociationToken(token);

        const room = await api.createRoom();
        setRoom(room);
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
