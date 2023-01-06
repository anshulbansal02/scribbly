import { ReactComponent as BellIcon } from "../static/bell.svg";
import { ReactComponent as ErrorIcon } from "../static/error.svg";
import { ReactComponent as CheckIcon } from "../static/check.svg";
import { ReactComponent as WarningIcon } from "../static/warning.svg";
import { ReactComponent as InfoIcon } from "../static/info.svg";

const types = {
    notification: {
        title: "Heads up!",
        icon: <BellIcon />,
        styles: {
            color: "#000",
            backgroundColor: "#fff",
        },
    },
    error: {
        title: "Error!",
        icon: <ErrorIcon />,
        styles: {
            backgroundColor: "#D72727",
            color: "#fff",
        },
    },
    success: {
        title: "Success!",
        icon: <CheckIcon />,
        styles: {
            backgroundColor: "#03BC35",
            color: "#fff",
        },
    },
    warning: {
        title: "Warning!",
        icon: <WarningIcon />,
        styles: {
            backgroundColor: "#FFE60A",
            color: "#000",
        },
    },
    info: {
        title: "Info",
        icon: <InfoIcon />,
        styles: {
            backgroundColor: "#1E7EEF",
            color: "#fff",
        },
    },
};

export default types;
