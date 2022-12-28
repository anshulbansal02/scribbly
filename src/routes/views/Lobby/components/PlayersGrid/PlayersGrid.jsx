import styles from "./PlayersGrid.module.scss";

import { Avatar } from "shared/components";

export default function PlayersGrid() {
    return (
        <div className={styles.playersGrid}>
            <div className={styles.header}>
                <h3>Who's here</h3>
                <div className={styles.playersOnline}>
                    <div className={styles.statusDot}></div>
                    <h5>6 Players</h5>
                </div>
            </div>
            <div className={styles.grid}>
                <Avatar size={64} withUsername />
                <Avatar size={64} withUsername />
                <Avatar size={64} withUsername />
                <Avatar size={64} withUsername />
                <Avatar size={64} withUsername />
                <Avatar size={64} withUsername />
            </div>
        </div>
    );
}
