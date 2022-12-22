import styles from "./RoomCodeModal.module.scss";

import { useState } from "react";
import { useInput } from "shared/hooks";

import { Modal, Button, Field } from "shared/components";
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
        if (validateRoomCodeInput()) {
            await api.createPlayer(username);
            await api.requestRoomJoin(roomCodeInput.value);
        }
    };

    return (
        <Modal
            isOpen={isOpen}
            onOutsideClick={onClose}
            className={styles.container}
        >
            <div className={styles.header}>
                <h3>Hey {username},</h3>
                <p>What's your room code?</p>
            </div>
            <Field
                className={styles.roomCodeField}
                style={{ textAlign: "center" }}
                type="text"
                placeholder="Room Code"
                spellCheck="false"
                maxLength="6"
                error={roomCodeInputError}
                {...roomCodeInput}
                autoFocus
            />
            <Button onClick={handleRoomJoin} theme="green">
                Lessgo
            </Button>
            <Button onClick={onClose}>Cancel</Button>
        </Modal>
    );
}
