// import { useEffect, useState } from 'react';
import { Card } from './Card';
import { GameHeader } from './GameHeader';
import { WinMessage } from './WinMessage';
import { useGameLogic } from '../context/GameCardContext';
import { cardValues } from '../src/cardValues';

export const GameArea = () => {
  const {
    cards,
    score,
    moves,
    initializeGame,
    completedGame,
    handleClick,
    miss,
  } = useGameLogic(cardValues);

  return (
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
  );
};
