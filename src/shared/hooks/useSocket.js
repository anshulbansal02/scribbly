import { useContext } from "react";

import { SocketContext } from "store/contexts";

const useSocket = () => {
    return useContext(SocketContext);
};

export default useSocket;
