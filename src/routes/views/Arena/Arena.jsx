import "./arena.css";

import { Page } from "shared/components";
import { Chatbox, Board } from "routes/components";

export default function Arena() {
    return (
        <Page className="arena-page">
            <Chatbox />
            <Board />
        </Page>
    );
}
