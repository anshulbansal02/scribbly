import Home from "./Home/Home";
import Lobby from "./Lobby/Lobby";
import FourOhFour from "./FourOhFour/FourOhFour";

import { createBrowserRouter } from "react-router-dom";

const router = createBrowserRouter([
    {
        path: "/",
        element: <Home />,
        errorElement: <FourOhFour />,
    },
    {
        path: "/game",
        element: <Lobby />,
    },
]);

export default router;
