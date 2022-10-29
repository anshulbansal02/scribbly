import "./home.css";
import "./button.css";
import "./input.css";

import useInput from "./useInput";

const Home = () => {
    const [username, setUsername] = useInput();

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
                    <button className="btn-block">Join Room</button>
                </div>
            </div>
        </div>
    );
};

export default Home;
