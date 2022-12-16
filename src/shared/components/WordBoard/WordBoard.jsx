import "./wordBoard.css";

export default function WordBoard({ word }) {
    return (
        <div className="word-board">
            {word.split("").map((letter, i) => {
                if (letter === "*")
                    return <div key={i} className="letter-hidden" />;
                else if (letter === " ")
                    return <div key={i} className="letter-space" />;
                else
                    return (
                        <p key={i} className="letter">
                            {letter}
                        </p>
                    );
            })}
        </div>
    );
}
