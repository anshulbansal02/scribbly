import styles from "./Button.module.css";

import classNames from "classnames";

const Button = ({ children, theme, disabled, ...props }) => {
    return (
        <button
            className={classNames(styles.base, styles[theme], {
                [styles.disabled]: disabled,
            })}
            {...props}
        >
            {children}
        </button>
    );
};

export default Button;
