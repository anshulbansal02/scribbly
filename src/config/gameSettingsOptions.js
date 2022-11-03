const gameSettingsOptions = {
    difficulty: {
        options: [
            { label: "Easy", value: 0 },
            { label: "Medium", value: 1 },
            { label: "Hard", value: 2 },
        ],
        get default() {
            return this.options[1];
        },
    },
    drawingTime: {
        options: [
            { label: "60s", value: 60 },
            { label: "70s", value: 70 },
            { label: "80s", value: 80 },
            { label: "90s", value: 90 },
            { label: "100s", value: 100 },
            { label: "110s", value: 110 },
            { label: "120s", value: 120 },
        ],
        get default() {
            return this.options[3];
        },
    },
    rounds: {
        options: [
            { label: "2", value: 2 },
            { label: "3", value: 3 },
            { label: "4", value: 4 },
            { label: "5", value: 5 },
            { label: "6", value: 6 },
            { label: "7", value: 7 },
            { label: "8", value: 8 },
        ],
        get default() {
            return this.options[1];
        },
    },
};

export default gameSettingsOptions;
