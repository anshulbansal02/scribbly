import "./timer.css";

const STROKE_DASH_ARRAY = 2 * Math.PI * 18;

export default function Timer({ maxTime, timeLeft }) {
    function getStrokeOffset() {
        return STROKE_DASH_ARRAY - (timeLeft / maxTime) * STROKE_DASH_ARRAY;
    }

    return (
        <div className="timer">
            <svg className="countdown-ring" viewBox="0 0 48 48">
                <circle
                    className="background-ring"
                    r="18"
                    cx="24"
                    cy="24"
                ></circle>
                <circle
                    className="overlay-ring"
                    r="18"
                    cx="24"
                    cy="24"
                    strokeDasharray={STROKE_DASH_ARRAY}
                    strokeDashoffset={getStrokeOffset()}
                ></circle>
            </svg>
            <div className="countdown-text">{timeLeft}</div>
        </div>
    );
}
