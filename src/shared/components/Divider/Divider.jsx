import classNames from "classnames";
import styles from "./Divider.module.css";

const Divider = ({ vertical, spacing }) => {
    return (
        <div
            className={classNames(styles.rule, { [styles.vertical]: vertical })}
            style={{
                margin: `${vertical ? 0 : spacing}px ${
                    vertical ? spacing : 0
                }px`,
            }}
        />
    );
};

export default Divider;
