import axios from "axios";
import { useAtomValue } from "jotai";
import { useCallback } from "react";

import { useToaster } from "shared/hooks";

import authAtoms from "store/atoms/authAtoms";

const server = axios.create({
    baseURL: `${process.env.REACT_APP_API_SERVER_URL}/api`,
});

function useApi() {
    const toaster = useToaster();

    const clientId = useAtomValue(authAtoms.clientId);
    server.defaults.headers.common["Client-Id"] = clientId;

    const request = useCallback(
        async (method, endpoint, config) => {
            const { params, data } = config || {};
            try {
                const response = await server({
                    method,
                    url: endpoint,
                    data,
                    params,
                });

                return response.data.message;
            } catch (err) {
                toaster.error({
                    title: "Server Error! Please try again.",
                    dismissable: false,
                });
            }
        },
        [toaster]
    );

    return {
        async createPlayer(username) {
            return (
                (await request("post", "/player/create", {
                    data: { username },
                })) ?? {}
            );
        },

        async getPlayer(playerId) {
            return await request("get", `/player/${playerId}`);
        },

        async createRoom() {
            return await request("post", "/room/create");
        },

        async requestRoomJoin(roomId) {
            const resp = await server.post("/room/join", { roomId });
        },

        async roomExists(roomId) {
            const resp = await server.get(`/room-exists/${roomId}`);
        },

        async getRoom(roomId) {
            const resp = await server.get(`room/${roomId}`);
        },
    };
}

export default useApi;
