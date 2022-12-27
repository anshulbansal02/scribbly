import classNames from "classnames";
import styles from "./Logo.module.css";

const Logo = ({ size, className, ...props }) => {
    return (
        <div className={classNames(styles.logo, className)} {...props}>
            <h1 style={{ fontSize: `${size}px` }}>Scribbly</h1>
        </div>
    );
};

export default Logo;
