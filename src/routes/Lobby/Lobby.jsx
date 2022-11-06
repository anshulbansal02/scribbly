import "./lobby.css";

import { useAtomValue, useSetAtom } from "jotai";
import { useEffect } from "react";

import { useSocket } from "contexts/SocketContext";
import IOEvents from "config/events";
import {
    gameSettingsAtom,
    resetRoomAtom,
    roomJoinURLAtom,
} from "atoms/roomAtoms";

import {
    Page,
    TextAction,
    GameSettings,
    RoomPlayers,
    Button,
    Modal,
} from "components";
import { useToggle } from "hooks";

export default function Lobby() {
    const roomJoinURL = useAtomValue(roomJoinURLAtom);
    const setGameSettings = useSetAtom(gameSettingsAtom);
    const resetRoom = useSetAtom(resetRoomAtom);

    const [exitRoomModal, toggleExitRoomModal] = useToggle();

    const socket = useSocket();

    useEffect(() => {
        socket.on(IOEvents.GAME_SETTINGS_CHANGE, ({ settings }) => {
            setGameSettings((prevSettings) => ({
                ...prevSettings,
                ...settings,
            }));
        });

        return () => {
            socket.off(IOEvents.GAME_SETTINGS_CHANGE);
        };
    }, [socket]);

    const handleGameStart = () => {};
    const handleRoomExit = () => {
        if (exitRoomModal) {
            socket.emit(IOEvents.ROOM_LEAVE);
            resetRoom();
        } else {
            toggleExitRoomModal();
        }
    };

    const handleGameSettingsChange = (settings) => {
        socket.emit(IOEvents.GAME_SETTINGS_CHANGE, { settings });
    };

    return (
        <Page className="lobby-page">
            <div className="header">
                <h4 className="logo">Scribbly</h4>
            </div>

            <div className="lobby-main">
                <GameSettings onChange={handleGameSettingsChange} />
                <RoomPlayers />
            </div>

            <div className="invite-box">
                <h5>
                    Share this link with others to invite them to this room.
                </h5>
                <TextAction text={roomJoinURL} />
            </div>

            <div className="btn-group">
                <Button className="green" onClick={handleGameStart}>
                    Let's Play
                </Button>
                <Button onClick={handleRoomExit}>Exit Room</Button>
            </div>

            <Modal
                className="exit-room-modal"
                isOpen={exitRoomModal}
                onOutsideClick={toggleExitRoomModal}
            >
                <h4>Do you really want to exit the room?</h4>
                <div className="btn-group">
                    <Button className="red" onClick={handleRoomExit}>
                        Yes, Exit
                    </Button>
                    <Button onClick={toggleExitRoomModal}>Noooo</Button>
                </div>
            </Modal>
        </Page>
    );
}
