import { useEffect, useState } from 'react';
import { Card } from './Card';
import { GameHeader } from './GameHeader';
import GameHistory from './GameHistory';
import { WinMessage } from './WinMessage';
import { useGameLogic } from '../hooks/useGameLogic';

const cardValues = [
  '🎮',
  '🥞',
  '🍿',
  '🧭',
  '⛈️',
  '🔥',
  '🔰',
  '☢️',
  '🎮',
  '🥞',
  '🍿',
  '🧭',
  '⛈️',
  '🔥',
  '🔰',
  '☢️',
];

export const Single = () => {
  const {
    cards,
    score,
    moves,
    initializeGame,
    completedGame,
    handleClick,
    miss,
  } = useGameLogic(cardValues);
  const [history, setHistory] = useState([]);

  useEffect(() => {
    if (!completedGame) {
      return;
    }

    const entry = {
      id: `${Date.now()}-${Math.random().toString(16).slice(2)}`,
      score,
      moves,
      miss,
    };

    setHistory((prev) => [entry, ...prev].sort((a, b) => a.moves - b.moves)); // [0,1,2,3,...,7]
  }, [completedGame, score, moves, miss]);
  return (
    <div className="app main-layout">
      <div className="game-area">
        <GameHeader
          score={score}
          moves={moves}
          miss={miss}
          reset={initializeGame}
        />

        {completedGame && <WinMessage moves={moves} />}

        <div className="cards-grid">
          {cards.map((card) => (
            <Card key={card.id} card={card} onclick={handleClick} />
          ))}
        </div>
      </div>

      <GameHistory history={history} />
    </div>
  );
};
