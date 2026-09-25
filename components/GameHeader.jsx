export const Score = ({ score }) => {
  return (
    <div className="stat-item">
      <span className="stat-label">Score</span>
      <span className="stat-value">{score}</span>
    </div>
  );
};

export const Moves = ({ moves }) => {
  return (
    <div className="stat-item">
      <span className="stat-label">Moves</span>
      <span className="stat-value">{moves}</span>
    </div>
  );
};

export const Miss = ({ miss }) => {
  return (
    <div className="stat-item">
      <span className="stat-label">Miss</span>
      <span className="stat-value">{miss}</span>
    </div>
  );
};

export const ResetBtn = ({reset}) => {
  return (
    <button className="reset-btn" onClick={reset}>
      New Game
    </button>
  );
};

export const GameHeader = ({ text = '', children }) => {
  return (
    <div className="game-header">
      <h1>🎮 Memory Card Game {text}</h1>
      {children}
    </div>
  );
};
