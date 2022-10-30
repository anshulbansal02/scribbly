import "./lobby.css";

import { Selector, Avatar, Page } from "components";
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
        <Page>
            <div className="home-page">
                <h3 className="title">Scribbly | Lobby</h3>

                <div className="lobby">
                    <div className="settings">
                        <Selector
                            options={gameSettings.difficulty.options}
                            labelKey="label"
                            name="difficulty"
                            selected={selectedSettings.difficulty}
                            onChange={handleSettingsChange}
                        />
                        <Selector
                            options={gameSettings.drawingTime.options}
                            labelKey="label"
                            name="drawingTime"
                            selected={selectedSettings.drawingTime}
                            onChange={handleSettingsChange}
                        />
                        <Selector
                            options={gameSettings.rounds.options}
                            labelKey="label"
                            name="rounds"
                            selected={selectedSettings.rounds}
                            onChange={handleSettingsChange}
                        />
                    </div>
                    <div className="players-in-room">
                        <Avatar />
                    </div>
                </div>
            </div>
        </Page>
    );
};

export default Lobby;
