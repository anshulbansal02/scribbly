import "./lobby.css";

import { Selector, Avatar, Page, Button, TextShare } from "components";
import { useState } from "react";

import { gameSettings } from "config";

const Lobby = () => {
    const [selectedSettings, setSelectedSettings] = useState({
        difficulty: gameSettings.difficulty.default,
        drawingTime: gameSettings.drawingTime.default,
        rounds: gameSettings.rounds.default,
    });

    const handleSettingsChange = (selected) => {
        const { name, value } = selected;
        console.log("New Settings: ", {
            ...selectedSettings,
            [name]: selected,
        });
        setSelectedSettings({ ...selectedSettings, [name]: value });
    };

    return (
        <Page className="lobby-page">
            <div className="header">
                <h3 className="logo">Scribbly</h3>
            </div>
            <div className="settings">
                <h4>Game Preferences</h4>
                <label className="label">Difficulty Level</label>
                <Selector
                    options={gameSettings.difficulty.options}
                    labelKey="label"
                    name="difficulty"
                    selected={selectedSettings.difficulty}
                    onChange={handleSettingsChange}
                />
                <label className="label">Drawing Time (In Seconds)</label>

                <Selector
                    options={gameSettings.drawingTime.options}
                    labelKey="label"
                    name="drawingTime"
                    selected={selectedSettings.drawingTime}
                    onChange={handleSettingsChange}
                />
                <label className="label">Number Of Rounds</label>

                <Selector
                    options={gameSettings.rounds.options}
                    labelKey="label"
                    name="rounds"
                    selected={selectedSettings.rounds}
                    onChange={handleSettingsChange}
                />
            </div>
            <div className="room">
                <h4>In The Room</h4>
                <TextShare text="scribbly.app/join/xdfjld" />
                <div className="players-list">
                    <Avatar label="knavish" />
                    <Avatar label="theplayeroftheshadow" />
                    <Avatar label="anshul" />
                    <Avatar label="mightyrock" />
                    <Avatar label="kris" />
                    <Avatar label="Trockthemighty" />
                    <Avatar label="knavihs" />
                </div>
            </div>

            <Button className="green">Let's Play</Button>
        </Page>
    );
};

export default Lobby;
