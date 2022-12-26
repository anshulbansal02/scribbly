import axios from "axios";
import { useAtomValue } from "jotai";
import { useCallback } from "react";

import { useToaster } from "shared/hooks";

import { useSetAtom } from "jotai";

import authAtoms from "store/atoms/authAtoms";
import playerAtoms from "store/atoms/playerAtoms";
import roomAtoms from "store/atoms/roomAtoms";

const server = axios.create({
    baseURL: `${process.env.REACT_APP_API_SERVER_URL}/api`,
});

function useApi() {
    const toaster = useToaster();

    const clientId = useAtomValue(authAtoms.clientId);
    server.defaults.headers.common["Client-Id"] = clientId;

    const request = async (method, endpoint, config) => {
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
    };

    const setPlayer = useSetAtom(playerAtoms.player);
    const setAssociationToken = useSetAtom(authAtoms.associationToken);
    const setRoom = useSetAtom(roomAtoms.room);

    return {
        async createPlayer(username) {
            const { player, token } = await request("post", "/player/create", {
                data: { username },
            });

            setPlayer(player);
            setAssociationToken(token);

            return player;
        },

        async getPlayer(playerId) {
            return await request("get", `/player/${playerId}`);
        },

        async createRoom() {
            const room = await request("post", "/room/create");
            setRoom(room);

            return room;
        },

        async requestRoomJoin(roomId) {
            await request("post", `/room/join/${roomId}`);
        },

        async cancelRoomJoinRequest() {
            await request("post", "/room/cancel-join/");
        },
    };
}

export default useApi;
