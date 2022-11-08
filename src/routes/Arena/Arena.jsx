import "./arena.css";

import { Page, Board, Chatbox } from "components";

export default function Arena() {
    return (
        <Page className="arena-page">
            <Chatbox />
            <Board />
        </Page>
    );
}
