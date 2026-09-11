const GameHistory = ({ history = [] }) => {
	return (
		<div className="history-container">
			<div className="history-title">
				<h1>Histori Game</h1>
				<span className="history-count">({history.length})</span>
			</div>

			{history.length === 0 ? (
				<p className="history-empty">
					Belum ada histori game. Selesaikan satu ronde untuk melihat hasilnya.
				</p>
			) : (
				<div className="history-list">
					{history.map((item) => (
						<div key={item.id} className="history-item">
							<div className="history-item-meta">
								<span>Score: {item.score}</span>
								<span>Moves: {item.moves}</span>
								<span>Miss: {item.miss}</span>
							</div>
						</div>
					))}
				</div>
			)}
		</div>
	);
};

export default GameHistory;