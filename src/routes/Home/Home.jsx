import "./home.css";
import "./button.css";
import "./input.css";

import useInput from "./useInput";

import Modal from "../../components/Modal/Modal";
import { useState } from "react";

const Home = () => {
    const [username, setUsername] = useInput();

    const [isModalOpen, setIsModalOpen] = useState(false);

    const handleModalClose = () => {
        setIsModalOpen(false);
    };

    const handleJoinRoom = () => {
        setIsModalOpen(true);
    };

    return (
        <div className="home-page">
            <h3 className="title">Scribbly</h3>

            <div className="home-form">
                <input
                    type="text"
                    className="input-box"
                    placeholder="What would you like to call yourself?"
                    value={username}
                    onChange={setUsername}
                />
                <button className="btn-block">Play Random</button>
                <div className="row">
                    <button className="btn-block">New Room</button>
                    <button className="btn-block" onClick={handleJoinRoom}>
                        Join Room
                    </button>
                </div>
            </div>

            <Modal isOpen={isModalOpen} onOutsideClick={handleModalClose}>
                <h3>Modal Title</h3>
                <p>
                    Lorem ipsum dolor sit amet consectetur adipisicing elit.
                    Perferendis molestias, ea consequuntur eaque optio provident
                    dolore quas suscipit beatae! Dicta voluptas laboriosam
                    eligendi recusandae nisi vel molestias debitis labore
                    beatae!
                </p>
            </Modal>
        </div>
    );
};

export default Home;
