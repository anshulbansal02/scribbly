import "./home.css";

import useInput from "../../hooks/useInput";

import { Modal, Page, Button, Input } from "./../../components";

import { useState } from "react";

const Home = () => {
    const [username, setUsername] = useInput();
    const [isModalOpen, setIsModalOpen] = useState(false);

    const closeModal = () => {
        setIsModalOpen(false);
    };

    const handlePlayNow = () => {};

    const handleNewRoom = () => {};

    const handleJoinRoom = () => {
        setIsModalOpen(true);
    };

    return (
        <Page>
            <div className="home-page">
                <h3 className="title">Scribbly</h3>

                <div className="home-form">
                    <Input
                        type="text"
                        placeholder="What would you like to call yourself?"
                        value={username}
                        onChange={setUsername}
                    />
                    <Button onClick={handlePlayNow}>Play Random</Button>
                    <div className="row">
                        <Button onClick={handleNewRoom}>New Room</Button>
                        <Button onClick={handleJoinRoom}>Join Room</Button>
                    </div>
                </div>

                <Modal isOpen={isModalOpen} onOutsideClick={closeModal}>
                    <h3>Enter Room Code</h3>
                    <Input placeholder="Room Code" />
                    <Button>Lessgo</Button>
                </Modal>
            </div>
        </Page>
    );
};

export default Home;
