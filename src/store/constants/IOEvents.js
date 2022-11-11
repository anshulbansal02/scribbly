const IOEvents = Object.freeze({
    PLAYER_CREATE: "player:create",

    ROOM_CREATE: "room:create",
    ROOM_JOIN: "room:join",
    ROOM_PLAYER_JOIN: "room:player_join",
    ROOM_PLAYER_LEAVE: "room:player_leave",
    ROOM_INFO: "room:info",
    ROOM_LEAVE: "room:leave",
    ROOM_KICK: "room:kick",
    ROOM_NON_EXISTANT: "room:non_existant",

    GAME_SETTINGS_CHANGE: "game:settings_change",
    GAME_START: "game:start",
    GAME_ROUND: "game:round",
    GAME_TURN: "game:turn",
    GAME_WORDS: "game:words",
    GAME_WORD: "game:word",
    GAME_TIMER_START: "game:timer_start",
    GAME_TIMER_END: "game:timer_end",
    GAME_ROUND_SCORE: "game:round_score",
    GAME_END: "game:end",
    GAME_SCORE: "game:score",

    CANVAS: "canvas",

    CHAT_MESSAGE: "chat:message",
    CHAT_GUESS: "chat:guess",
});

export default IOEvents;
