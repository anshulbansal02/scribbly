/*
Message {
    id: string
    userId: string
    timestamp: time
    text: string
}


chatMessages [
    {
        userId: string
        textList: {
            id: string
            timestamp: time
            text: string
        }
    }
]

Chat:message
Send: {text}
Receive: {id, userId, timestamp, text}


*/

import { atom } from "jotai";

const messagesAtom = atom([]);

export { messagesAtom };
