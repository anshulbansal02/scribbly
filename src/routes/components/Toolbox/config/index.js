import { ToolsEnum } from "store/constants/canvas";

import { ReactComponent as BrushIcon } from "../static/brush.svg";
import { ReactComponent as BucketIcon } from "../static/bucket.svg";
import { ReactComponent as EraserIcon } from "../static/eraser.svg";

const tools = [
    {
        component: <BrushIcon />,
        value: ToolsEnum.BRUSH,
    },
    {
        component: <BucketIcon />,
        value: ToolsEnum.BUCKET,
    },
    {
        component: <EraserIcon />,
        value: ToolsEnum.ERASER,
    },
];

const colors = [
    "#000000",
    "#888888",
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
