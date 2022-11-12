import "./wordBoard.css";

export default function WordBoard({ word }) {
    return (
        <div className="word-board">
            {word.split("").map((letter) => {
                if (letter === "*") return <div className="letter-hidden" />;
                else if (letter === " ")
                    return <div className="letter-space" />;
                else return <p className="letter">{letter}</p>;
            })}
        </div>
    );
}
