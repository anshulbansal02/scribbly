import { Logo } from "shared/components";
import PlayersGrid from "./components/PlayersGrid/PlayersGrid";
import SettingsPanel from "./components/SettingsPanel/SettingsPanel";
import styles from "./Lobby.module.scss";
import { ReactComponent as ExitIcon } from "./static/exit.svg";

export default function Lobby() {
    return (
        <div className={styles.lobby}>
            <div className={styles.header}>
                <Logo />
                <div className={styles.actions}>
                    <button className={styles.iconBtn}>
                        <ExitIcon />
                    </button>
                </div>
            </div>

            <div className={styles.main}>
                <div className={styles.panel}>
                    <SettingsPanel />
                </div>
                <PlayersGrid />
                <div className={styles.chat}></div>
            </div>
        </div>
    );
}
