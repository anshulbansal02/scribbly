import { RouterProvider } from "react-router-dom";

import router from "./routes";

import { SocketProvider } from "contexts/SocketContext";
import { ToastContainer } from "components";

import "./App.css";

export default function App() {
    return (
        <div className="App">
            <SocketProvider>
                <RouterProvider router={router} />
            </SocketProvider>
            <ToastContainer />
        </div>
    );
}
