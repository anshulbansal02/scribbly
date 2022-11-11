import "./App.css";

import { RouterProvider } from "react-router-dom";
import { useEffect, useRef } from "react";
import { useSetAtom } from "jotai";

import { router } from "routes";
import { useSocket, useToaster } from "shared/hooks";
import { playerIdAtom } from "store/atoms/playerAtoms";
import IOEvents from "store/constants/IOEvents";

import { ToastContainer } from "shared/components";

export default function App() {
    const errorToast = useRef(null);

    const setPlayerId = useSetAtom(playerIdAtom);

    const socket = useSocket();
    const toaster = useToaster();

    useEffect(() => {
        socket.connect();

        socket.on("connect", () => {
            if (errorToast.current) {
                toaster.dismiss(errorToast.current);
                toaster.toast({
                    title: "Connected! 👍",
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

        socket.on(IOEvents.PLAYER_CREATE, ({ player }) => {
            setPlayerId(player.id);
        });

        return () => {
            socket.off("connect");
            socket.off("connect_error");
            socket.off(IOEvents.PLAYER_CREATE);
        };
    }, [socket]);

    return (
        <div className="App">
            <RouterProvider router={router} />
            <ToastContainer />
        </div>
    );
}