import styles from "./Field.module.css";

import classNames from "classnames";

import { ReactComponent as ErrorIcon } from "./static/error.svg";

const Field = ({ className, error, ...props }) => {
    return (
        <div className={styles.field}>
            <input
                className={classNames(styles.input, className, {
                    [styles.errorInput]: error,
                })}
                {...props}
            />
            {error && (
                <div className={styles.error}>
                    <ErrorIcon width={16} /> <span>{error}</span>
                </div>
            )}
        </div>
    );
};

export default Field;
