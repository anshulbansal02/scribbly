import "./home.css";

import useInput from "hooks/useInput";

import { Modal, Page, Button, Input } from "components";

import { useState } from "react";
import { useSocket } from "contexts/SocketContext";
import events from "config/events";
import { useEffect } from "react";

const Home = () => {
    const [username, setUsername] = useInput();
    const [roomCode, setRoomCode] = useInput();
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [usernameInputError, setUsernameInputError] = useState("");

    const socket = useSocket();

    const closeModal = () => {
        setIsModalOpen(false);
    };

    useEffect(() => {
        socket.on(events.ROOM_JOIN, (room_data) => {
            console.log("Joined room ", room_data);
            // hydrate room data
            // move to lobby
        });

        socket.on(events.ROOM_PLAYER_JOIN, (player) => {
            console.log("Player joined the room: ", player);
        });
    }, [socket]);

    const handlePlayNow = () => {
        if (!username) {
            setUsernameInputError("Please provide a username");
            setTimeout(() => setUsernameInputError(""), 1000);
            return;
        }
    };

    const handleNewRoom = () => {
        if (!username) {
            setUsernameInputError("Please provide a username");
            setTimeout(() => setUsernameInputError(""), 1000);
            return;
        }

        // Request room creation
        socket.emit(events.ROOM_CREATE, { username });

        // intermediate loading screen
    };

    const handleJoinRoomModal = () => {
        if (!username) {
            setUsernameInputError("Please provide a username");
            setTimeout(() => setUsernameInputError(""), 1000);
            return;
        }
        setIsModalOpen(true);
    };

    const handleRoomJoin = () => {
        socket.emit(events.ROOM_JOIN, { roomId: roomCode, username });
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
                    value={username}
                    onChange={setUsername}
                    spellCheck="false"
                    error={usernameInputError}
                />
                <Button onClick={handlePlayNow} className="green">
                    Play Now
                </Button>
                <Button onClick={handleNewRoom}>New Room</Button>
                <Button onClick={handleJoinRoomModal}>Join Room</Button>
            </div>

            <Modal isOpen={isModalOpen} onOutsideClick={closeModal}>
                <div className="room-code-modal">
                    <h4>What's your room code?</h4>
                    <Input
                        type="text"
                        placeholder="Room Code"
                        value={roomCode}
                        onChange={setRoomCode}
                        spellCheck="false"
                        className="mono-input"
                    />
                    <Button onClick={handleRoomJoin} className="green">
                        Lessgo
                    </Button>
                    <Button onClick={closeModal}>Cancel</Button>
                </div>
            </Modal>
        </Page>
    );
};

export default Home;
