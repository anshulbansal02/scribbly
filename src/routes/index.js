import Home from "./Home/Home";
import Room from "./Room/Room";
import FourOhFour from "./FourOhFour/FourOhFour";

import { createBrowserRouter } from "react-router-dom";
import Join from "./Join/Join";

const router = createBrowserRouter([
    {
        path: "/",
        element: <Home />,
        errorElement: <FourOhFour />,
    },
    {
        path: "/game",
        element: <Room />,
    },
    {
        path: "/join/:roomId",
        element: <Join />,
    },
]);

export default router;
