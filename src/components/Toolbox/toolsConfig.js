import { ReactComponent as BrushIcon } from "./icons/brush.svg";
import { ReactComponent as BucketIcon } from "./icons/bucket.svg";
import { ReactComponent as EraserIcon } from "./icons/eraser.svg";

const tools = [
    {
        component: <BrushIcon />,
        value: "brush",
    },
    {
        component: <BucketIcon />,
        value: "bucket",
    },
    {
        component: <EraserIcon />,
        value: "eraser",
    },
];

const colors = [
    "#EA2027",
    "#EE5A24",
    "#FFC312",
    "#006266",
    "#009432",
    "#C4E538",
    "#1B1464",
    "#0652DD",
    "#12CBC4",
    "#B53471",
];

export { colors, tools };
