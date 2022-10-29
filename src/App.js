import "./App.css";

import { createBrowserRouter, RouterProvider } from "react-router-dom";

import { Home, FourOhFour } from "./routes";

const router = createBrowserRouter([
    {
        path: "/",
        element: <Home />,
        errorElement: <FourOhFour />,
    },
]);

export default function App() {
    return (
        <div className="App">
            <RouterProvider router={router} />
        </div>
    );
}
