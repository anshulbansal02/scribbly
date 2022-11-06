import "./lobby.css";

import { useAtomValue, useSetAtom, useAtom } from "jotai";
import { useEffect } from "react";

import { useSocket } from "contexts/SocketContext";
import IOEvents from "config/events";
import {
    gameSettingsAtom,
    resetRoomAtom,
    roomJoinURLAtom,
    roomPlayersAtom,
} from "atoms/roomAtoms";

import {
    Page,
    TextShare,
    GameSettings,
    RoomPlayers,
    Button,
    Modal,
} from "components";
import { useToggle } from "hooks";

const Lobby = () => {
    const roomJoinURL = useAtomValue(roomJoinURLAtom);
    const setPlayersInRoom = useSetAtom(roomPlayersAtom);
    const setGameSettings = useSetAtom(gameSettingsAtom);
    const resetRoom = useAtom(resetRoomAtom);

    const [exitRoomModal, toggleExitRoomModal] = useToggle();

    const socket = useSocket();

    useEffect(() => {
        socket.on(IOEvents.ROOM_PLAYER_JOIN, ({ player }) => {
            setPlayersInRoom((players) => [...players, player]);
        });

        socket.on(IOEvents.ROOM_PLAYER_LEAVE, ({ player }) => {
            setPlayersInRoom((players) =>
                players.filter((playerInRoom) => player.id !== playerInRoom.id)
            );
        });

        socket.on(IOEvents.GAME_SETTINGS_CHANGE, ({ settings }) => {
            setGameSettings((prevSettings) => ({
                ...prevSettings,
                ...settings,
            }));
        });

        return () => {
            socket.off(IOEvents.ROOM_PLAYER_JOIN);
            socket.off(IOEvents.ROOM_PLAYER_LEAVE);
            socket.off(IOEvents.GAME_SETTINGS_CHANGE);
        };
    }, [socket]);

    const handleRoomJoin = () => {};
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
            <TextShare text={roomJoinURL} />

            <div className="btn-group">
                <Button className="green" onClick={handleRoomJoin}>
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
};

export default Lobby;
