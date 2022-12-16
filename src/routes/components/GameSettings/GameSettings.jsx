import "./gameSettings.css";

import { useAtom } from "jotai";

import { gameSettingsOptions } from "store/config";
import { useIsAdmin } from "shared/hooks";

import { Selector } from "shared/components";
import { useState } from "react";

export default function GameSettings({ onChange }) {
    const [gameSettings, setGameSettings] = useState(); // UseAtom
    const isAdmin = useIsAdmin();

    const handleSettingsChange = (selected) => {
        const { name, value } = selected;
        setGameSettings({ ...gameSettings, [name]: value });
        onChange({ [name]: value });
    };

    return (
        <div className="game-settings">
            <h4>Game Preferences</h4>

            <div className="settings-list">
                <div className="setting">
                    <label className="setting-label">Difficulty Level</label>
                    <Selector
                        name="difficulty"
                        labelKey="label"
                        options={gameSettingsOptions.difficulty.options}
                        selected={gameSettings.difficulty}
                        onChange={handleSettingsChange}
                        disabled={!isAdmin}
                    />
                </div>
                <div className="setting">
                    <label className="setting-label">Number Of Rounds</label>
                    <Selector
                        name="rounds"
                        labelKey="label"
                        options={gameSettingsOptions.rounds.options}
                        selected={gameSettings.rounds}
                        onChange={handleSettingsChange}
                        disabled={!isAdmin}
                    />
                </div>
                <div className="setting">
                    <label className="setting-label">
                        Drawing Time (in seconds)
                    </label>
                    <Selector
                        name="drawingTime"
                        labelKey="label"
                        options={gameSettingsOptions.drawingTime.options}
                        selected={gameSettings.drawingTime}
                        onChange={handleSettingsChange}
                        disabled={!isAdmin}
                    />
                </div>
            </div>
        </div>
    );
}
