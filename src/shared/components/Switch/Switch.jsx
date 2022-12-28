import styles from "./Switch.module.css";

const Switch = ({ id, onChange, value }) => {
    return (
        <div className={styles.container}>
            <input
                id={id}
                type="checkbox"
                className={styles.checkbox}
                value={value}
                onChange={onChange}
            />
            <label htmlFor={id} className={styles.track}>
                <div className={styles.knob}></div>
            </label>
        </div>
    );
};

export default Switch;
