export const GameHeader = ({score, moves, reset, miss}) => {
	return (
		<div className="game-header">
			<h1>🎮 Memory Card Game</h1>
			<div className="stats">
				<div className="stat-item">
					<span className="stat-label">Score :</span>
					<span className="stat-value">{score}</span>
				</div>
				<div className="stat-item">
					<span className="stat-label">Moves :</span>
					<span className="stat-value">{moves}</span>
				</div>
				<div className="stat-item">
					<span className="stat-label">Miss :</span>
					<span className="stat-value">{miss}</span>
				</div>
			</div>

			<button className="reset-btn" onClick={reset}>New Game</button>
		</div>
	);
};
