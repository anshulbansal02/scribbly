import { createBrowserRouter } from "react-router-dom";

import {
    HomeView,
    RoomView,
    FourOhFourView,
    JoinRoomView,
    ArenaView,
} from "./views";

const router = createBrowserRouter([
    {
        path: "/",
        element: <HomeView />,
        errorElement: <FourOhFourView />,
    },
    {
        path: "/game",
        element: <RoomView />,
    },
    {
        path: "/join/:roomId",
        element: <JoinRoomView />,
    },
    {
        path: "/test",
        element: <ArenaView />,
    },
]);

export default router;
