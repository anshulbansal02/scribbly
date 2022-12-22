import "./home.css";

import { useState } from "react";
import { useSetAtom } from "jotai";
import { useNavigate } from "react-router";

import { useInput, useToggle, useSocket } from "shared/hooks";

import playerAtoms from "store/atoms/playerAtoms";
import authAtoms from "store/atoms/authAtoms";
import roomAtoms from "store/atoms/roomAtoms";

import { Page, Button, Input } from "shared/components";
import useApi from "api";
import RoomCodeModal from "./RoomCodeModal";

export default function Home() {
    // UI State
    const usernameInput = useInput({
        changeHook: () => setUsernameInputError(""),
    });
    const [usernameInputError, setUsernameInputError] = useState("");
    const [roomCodeModalOpen, toggleRoomCodeModal] = useToggle();

    // Atoms
    const setRoom = useSetAtom(roomAtoms.room);
    const setPlayer = useSetAtom(playerAtoms.player);
    const setAssociationToken = useSetAtom(authAtoms.associationToken);

    const api = useApi();
    const socket = useSocket();
    const navigate = useNavigate();

    function validateUsernameInput() {
        if (usernameInput.value) return true;
        setUsernameInputError("Please enter a valid username.");
        return false;
    }

    // Handlers
    const handlePlayNow = () => {
        // Implementation Deferred
    };

    const handleNewRoom = async () => {
        if (validateUsernameInput()) {
            const { player, token } = await api.createPlayer(
                usernameInput.value
            );
            setPlayer(player);
            setAssociationToken(token);

            const room = await api.createRoom();
            setRoom(room);

            navigate("game");
        }
    };

    const handleJoinRoom = () => {
        validateUsernameInput() && toggleRoomCodeModal();
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
                <Button onClick={handleJoinRoom}>Join Room</Button>
            </div>

            <RoomCodeModal
                isOpen={roomCodeModalOpen}
                onClose={toggleRoomCodeModal}
                username={usernameInput.value}
            />
        </Page>
    );
}
