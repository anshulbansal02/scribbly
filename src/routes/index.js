import Home from "./Home/Home";
import Room from "./Room/Room";
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
        element: <Room />,
    },
]);

export default router;
