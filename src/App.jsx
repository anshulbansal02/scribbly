import "./App.css";

import { RouterProvider } from "react-router-dom";
import { useEffect, useRef } from "react";
import { useSetAtom } from "jotai";

import { router } from "routes";
import { useSocket, useToaster } from "shared/hooks";
import authAtoms from "store/atoms/authAtoms";

import { Toaster } from "shared/components";

export default function App() {
    const errorToast = useRef(null);

    const setClientId = useSetAtom(authAtoms.clientId);

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
                    text: "Cannot connect to the server. Trying to reconnect",
                    persistant: true,
                    dismissable: false,
                });
                errorToast.current = toastId;
            }
        });

        socket.on("client-id", (clientId) => {
            setClientId(clientId);
        });

        socket.on("disconnect", () => {
            setClientId(null);
        });

        return () => {
            socket.off("connect");
            socket.off("disconnect");
            socket.off("client_id");
            socket.off("connect_error");
        };
    }, [socket]);

    return (
        <>
            <RouterProvider router={router} />
            <Toaster />
        </>
    );
}
