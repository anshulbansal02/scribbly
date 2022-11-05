import { createContext, useContext } from "react";
const { io } = require("socket.io-client");

const SocketContext = createContext();

const SOCKET_SERVER_URL = process.env.REACT_APP_SOCKET_SERVER_URL;

const SocketProvider = ({ children }) => {
    const socket = io(SOCKET_SERVER_URL, { autoConnect: false });

    return (
        <SocketContext.Provider value={socket}>
            {children}
        </SocketContext.Provider>
    );
};

const useSocket = () => {
    return useContext(SocketContext);
};

export { SocketProvider, useSocket };
