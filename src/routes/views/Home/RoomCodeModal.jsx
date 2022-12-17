import "./home.css";

import { useState } from "react";

import { useInput } from "shared/hooks";

import { Modal, Button, Input } from "shared/components";
import useApi from "api";

export default function RoomCodeModal({ isOpen, onClose, username }) {
    const roomCodeInput = useInput({
        changeHook: () => setRoomCodeInputError(""),
    });
    const [roomCodeInputError, setRoomCodeInputError] = useState("");

    const api = useApi();

    function validateRoomCodeInput() {
        if (/^[a-z]{6}$/.test(roomCodeInput.value)) return true;
        setRoomCodeInputError("Please enter a valid room code.");
        return false;
    }

    const handleRoomJoin = async () => {
        validateRoomCodeInput() && (await api.joinRoom());
    };

    return (
        <Modal
            isOpen={isOpen}
            onOutsideClick={onClose}
            className="room-code-modal"
        >
            <div className="modal-text">
                <h3>Hey {username},</h3>
                <p>What's your room code?</p>
            </div>
            <Input
                type="text"
                placeholder="Room Code"
                spellCheck="false"
                maxLength="6"
                error={roomCodeInputError}
                {...roomCodeInput}
                autoFocus
            />
            <Button onClick={handleRoomJoin} className="green">
                Lessgo
            </Button>
            <Button onClick={onClose}>Cancel</Button>
        </Modal>
    );
}
