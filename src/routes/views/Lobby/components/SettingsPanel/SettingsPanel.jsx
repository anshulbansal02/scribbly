import { OptionStepper, Switch, Clipboard, Divider } from "shared/components";

import styles from "./SettingsPanel.module.scss";

export default function SettingsPanel() {
    return (
        <div className={styles.container}>
            <h3 className={styles.sectionHeadin}>Preferences</h3>

            <Divider spacing={24} />

            <h4>Game</h4>

            <div className={styles.row}>
                <div>
                    <h5>Difficulty Level</h5>
                </div>
                <OptionStepper
                    className={styles.stepper}
                    options={["Medium"]}
                    value="Medium"
                />
            </div>

            <div className={styles.row}>
                <div>
                    <h5>Number Of Rounds</h5>
                </div>
                <OptionStepper
                    className={styles.stepper}
                    options={["1"]}
                    value="1"
                />
            </div>

            <div className={styles.row}>
                <div>
                    <h5>Drawing Time</h5>
                    <p>Same as guessing time</p>
                </div>
                <OptionStepper
                    className={styles.stepper}
                    options={["90s"]}
                    value="90s"
                />
            </div>

            <Divider spacing={24} />

            <h4>Room</h4>

            <div className={styles.row}>
                <div>
                    <h5>Private</h5>
                    <p>Room is public</p>
                </div>
                <Switch id="my-toggle" />
            </div>

            <Divider spacing={24} />

            <h4>Invite Others</h4>

            <Clipboard text="http://scribbly.game/join/azxewf" />
        </div>
    );
}
