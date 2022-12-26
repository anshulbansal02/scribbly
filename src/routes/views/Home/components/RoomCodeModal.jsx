import styles from "./RoomCodeModal.module.scss";

import { useState } from "react";
import { useInput } from "shared/hooks";

import { Modal, Button, CodeInput } from "shared/components";
import useApi from "api";
import Loader from "shared/components/Loader/Loader";

export default function RoomCodeModal({ isOpen, onClose, username }) {
    const roomCodeInput = useInput({
        changeHook: () =>
            setHelpText("You can also paste room join link here."),
    });
    const [helpText, setHelpText] = useState(
        "You can also paste room join link here."
    );
    const [isRequested, setIsRequested] = useState(false);

    const api = useApi();

    function validateRoomCodeInput() {
        if (roomCodeInput.value.length === 6) return true;
        setHelpText("Please enter a valid room code.");
        return false;
    }

    const handleRoomJoin = async () => {
        if (validateRoomCodeInput()) {
            await api.createPlayer(username);
            setIsRequested(true);
            setHelpText("Trying to get you into the room.");
            await api.requestRoomJoin(roomCodeInput.value);
        }
    };

    const handleCancelRequest = async () => {
        await api.cancelRoomJoinRequest();
        setIsRequested(false);
        onClose();
    };

    const joinUrlPasteParser = (text) => {
        try {
            const joinUrl = new URL(text);
            return joinUrl.pathname.match(/(?<=\/join\/)([a-zA-Z0-9]{6})/)[0];
        } catch {
            return text;
        }
    };

    return (
        <Modal
            isOpen={isOpen}
            onOutsideClick={isRequested ? () => {} : onClose}
            className={styles.container}
        >
            <div className={styles.codeInputContainer}>
                <div className={styles.text}>
                    {isRequested ? (
                        <>
                            <Loader />
                            <p>Requesting to join room</p>
                        </>
                    ) : (
                        <>
                            <h3>Hey {username},</h3>
                            <p>What's your room code?</p>
                        </>
                    )}
                </div>
                <CodeInput
                    id="roomCode"
                    length={6}
                    type="text"
                    {...roomCodeInput}
                    pasteParser={joinUrlPasteParser}
                    disabled={isRequested}
                />
                <p className={styles.helpText}>{helpText}</p>

                <div className={styles.btnGroup}>
                    {isRequested ? (
                        <Button
                            theme="red"
                            onClick={handleCancelRequest}
                        ></Button>
                    ) : (
                        <>
                            <Button onClick={onClose}>Cancel</Button>
                            <Button onClick={handleRoomJoin} theme="green">
                                Lessgo
                            </Button>
                        </>
                    )}
                </div>
            </div>
        </Modal>
    );
}
