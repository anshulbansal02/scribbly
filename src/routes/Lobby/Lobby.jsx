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
            <div className="row">
                <div className="col">
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
                        <label className="label">
                            Drawing Time (In Seconds)
                        </label>

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
                </div>
                <div className="col">
                    <div className="players-in-room">
                        <Avatar />
                    </div>
                </div>
            </div>
        </Page>
    );
};

export default Lobby;
