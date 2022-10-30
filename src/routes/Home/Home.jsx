import "./home.css";

import useInput from "hooks/useInput";

import { Modal, Page, Button, Input } from "components";

import { useState } from "react";
import { useNavigate } from "react-router-dom";

const Home = () => {
    const [username, setUsername] = useInput();
    const [isModalOpen, setIsModalOpen] = useState(false);

    const navigate = useNavigate();

    const closeModal = () => {
        setIsModalOpen(false);
    };

    const handlePlayNow = () => {};

    const handleNewRoom = () => {
        navigate("/game");
    };

    const handleJoinRoom = () => {
        setIsModalOpen(true);
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
                    spellcheck="false"
                />
                <Button onClick={handlePlayNow} className="green">
                    Play Now
                </Button>
                <Button onClick={handleNewRoom}>New Room</Button>
                <Button onClick={handleJoinRoom}>Join Room</Button>
            </div>

            <Modal isOpen={isModalOpen} onOutsideClick={closeModal}>
                <h4>What's your room code?</h4>
                <Input
                    type="text"
                    placeholder="Room Code"
                    value={""}
                    onChange={() => {}}
                    spellcheck="false"
                    className="mono-input"
                />
                <Button onClick={handlePlayNow}>Lessgo</Button>
                <Button onClick={handleNewRoom}>Cancel</Button>
            </Modal>
        </Page>
    );
};

export default Home;
