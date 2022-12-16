import { createContext } from "react";
const { io } = require("socket.io-client");

const SocketContext = createContext();

const SOCKET_SERVER_URL = process.env.REACT_APP_SOCKET_SERVER_URL;

const SocketProvider = ({ children }) => {
    const socket = io(SOCKET_SERVER_URL, {
        autoConnect: false,
        path: process.env.REACT_APP_SOCKET_SERVER_PATH,
    });

    return (
        <SocketContext.Provider value={socket}>
            {children}
        </SocketContext.Provider>
    );
};

export { SocketProvider, SocketContext };
