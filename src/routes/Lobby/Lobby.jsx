import "./lobby.css";

import { useAtomValue, useSetAtom } from "jotai";
import { useEffect } from "react";

import { useSocket } from "contexts/SocketContext";
import IOEvents from "config/events";
import { gameSettingsAtom, roomJoinURLAtom, roomPlayersAtom } from "atoms";

import { Page, TextShare, GameSettings, RoomPlayers, Button } from "components";

const Lobby = () => {
    const roomJoinURL = useAtomValue(roomJoinURLAtom);
    const setPlayersInRoom = useSetAtom(roomPlayersAtom);
    const setGameSettings = useSetAtom(gameSettingsAtom);

    const socket = useSocket();

    useEffect(() => {
        socket.on(IOEvents.ROOM_PLAYER_JOIN, (player) => {
            setPlayersInRoom((players) => [...players, player]);
        });

        socket.on(IOEvents.GAME_SETTINGS_CHANGE, (settings) => {
            setGameSettings((prevSettings) => ({
                ...prevSettings,
                ...settings,
            }));
        });

        return () => {
            socket.off(IOEvents.ROOM_PLAYER_JOIN);
            socket.off(IOEvents.GAME_SETTINGS_CHANGE);
        };
    }, [socket]);

    const handleRoomJoin = () => {};
    const handleRoomExit = () => {};

    const handleGameSettingsChange = (settings) => {
        socket.emit(IOEvents.GAME_SETTINGS_CHANGE, settings);
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
        </Page>
    );
};

export default Lobby;
