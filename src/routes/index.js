import Home from "./Home/Home";
import FourOhFour from "./FourOhFour/FourOhFour";

import { createBrowserRouter } from "react-router-dom";

const router = createBrowserRouter([
    {
        path: "/",
        element: <Home />,
        errorElement: <FourOhFour />,
    },
]);

export default router;
