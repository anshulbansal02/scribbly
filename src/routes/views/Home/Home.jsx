import "./Home.scss";

import { useState } from "react";
import { useAtomValue } from "jotai";
import { useNavigate } from "react-router";
import { useInput, useSocket, useToggle } from "shared/hooks";
import useApi from "api";

import playerAtoms from "store/atoms/playerAtoms";

import { Button, Field } from "shared/components";
import RoomCodeModal from "./components/RoomCodeModal";

export default function Home() {
    const usernameInput = useInput({
        initialValue: useAtomValue(playerAtoms.username),
        changeHook: () => setUsernameInputError(""),
    });
    const [usernameInputError, setUsernameInputError] = useState("");
    const [roomCodeModalOpen, toggleRoomCodeModal] = useToggle();

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
            await api.createPlayer(usernameInput.value);
            await api.createRoom();
            navigate("game");
        }
    };

    return (
        <div className="page home">
            <div className="header">
                <h3 className="logo">Scribbly</h3>
                <h5 className="subtitle">
                    Realtime multiplayer online pictionary
                </h5>
            </div>

            <div className="ctas">
                <Field
                    style={{ textAlign: "center" }}
                    type="text"
                    placeholder="What would you like to call yourself?"
                    spellCheck="false"
                    error={usernameInputError}
                    {...usernameInput}
                />
                <Button onClick={handlePlayNow} theme="green">
                    Play Now
                </Button>
                <Button onClick={handleNewRoom}>New Room</Button>
                <Button
                    onClick={() => {
                        validateUsernameInput() && toggleRoomCodeModal();
                    }}
                >
                    Join Room
                </Button>
            </div>

            <RoomCodeModal
                isOpen={roomCodeModalOpen}
                onClose={toggleRoomCodeModal}
                username={usernameInput.value}
            />
        </div>
    );
}
