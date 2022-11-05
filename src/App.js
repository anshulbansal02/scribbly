import { RouterProvider } from "react-router-dom";
import { useEffect, useRef } from "react";

import router from "./routes";
import { useSocket } from "contexts/SocketContext";
import { useToaster } from "hooks";

import { ToastContainer } from "components";

import "./App.css";

export default function App() {
    const errorToast = useRef(null);

    const socket = useSocket();
    const toaster = useToaster();

    useEffect(() => {
        socket.connect();

        socket.on("connect", () => {
            if (errorToast.current) {
                toaster.dismiss(errorToast.current);
                toaster.toast({
                    title: "Connected! 🙌",
                    dismissable: false,
                });
                errorToast.current = null;
            }
        });

        socket.on("connect_error", () => {
            if (!errorToast.current) {
                const toastId = toaster.error({
                    title: "Connection Error!",
                    subtitle:
                        "Cannot connect to the server. Trying to reconnect",
                    persistant: true,
                    dismissable: false,
                });
                errorToast.current = toastId;
            }
        });

        return () => {
            socket.off("connect");
            socket.off("connect_error");
        };
    }, [socket]);

    return (
        <div className="App">
            <RouterProvider router={router} />
            <ToastContainer />
        </div>
    );
}
