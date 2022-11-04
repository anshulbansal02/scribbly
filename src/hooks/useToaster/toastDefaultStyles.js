import { ReactComponent as BellIcon } from "./icons/bell.svg";
import { ReactComponent as ErrorIcon } from "./icons/error.svg";
import { ReactComponent as CheckIcon } from "./icons/check.svg";
import { ReactComponent as WarningIcon } from "./icons/warning.svg";
import { ReactComponent as InfoIcon } from "./icons/info.svg";

const styles = {
    notification: {
        title: "Notification",
        color: "#000",
        backgroundColor: "#fff",
        icon: <BellIcon />,
    },
    error: {
        title: "Error",
        color: "#fff",
        backgroundColor: "#D72727",
        icon: <ErrorIcon />,
    },
    success: {
        title: "Success",
        color: "#fff",
        backgroundColor: "#03BC35",
        icon: <CheckIcon />,
    },
    warning: {
        title: "Warning",
        color: "#000",
        backgroundColor: "#FFE60A",
        icon: <WarningIcon />,
    },
    info: {
        title: "Information",
        color: "#fff",
        backgroundColor: "#1E7EEF",
        icon: <InfoIcon />,
    },
};

export default styles;
