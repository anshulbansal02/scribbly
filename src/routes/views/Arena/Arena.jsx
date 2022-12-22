import "./arena.css";

import { Page } from "shared/components";
import { Chatbox, Board } from "routes/components";

export default function Arena() {
    return (
        <div className="page">
            <Chatbox />
            <Board />
        </div>
    );
}
