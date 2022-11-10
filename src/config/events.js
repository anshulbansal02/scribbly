const Events = {
    PLAYER_CREATE: "player:create",

    ROOM_CREATE: "room:create", // C
    ROOM_JOIN: "room:join", // S,C
    ROOM_PLAYER_JOIN: "room:player_join", // S
    ROOM_PLAYER_LEAVE: "room:player_leave", // S
    ROOM_INFO: "room:info", // S
    ROOM_LEAVE: "room:leave", // C
    ROOM_KICK: "room:kick", // S,C
    ROOM_NON_EXISTANT: "room:non_existant",

    GAME_SETTINGS_CHANGE: "game:settings_change", // S,C
    GAME_START: "game:start", // S,C
    GAME_ROUND: "game:round",
    GAME_TURN: "game:turn", // S
    GAME_WORDS: "game:words", // S
    GAME_WORD: "game:word", // S,C
    GAME_TIMER_START: "game:timer_start", // S
    GAME_TIMER_END: "game:timer_end", // S
    GAME_ROUND_SCORE: "game:round_score", // S
    GAME_END: "game:end", // S
    GAME_SCORE: "game:score", // S

    CANVAS: "canvas", // S,C

    CHAT_MESSAGE: "chat:message", // S,C
    CHAT_GUESS: "chat:guess", // S
};

export default Object.freeze(Events);
