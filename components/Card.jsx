export const Card = ({card, onclick}) => {
    return(
        <div className={`card ${card.isFlipped ? "flipped" : ""} ${card.isMatched ? "matched" : ""}`} 
        onClick={() => onclick(card)}>
            <div className="card-front">?</div>
            <div className="card-back">{card.value}</div>
        </div>
    )
}