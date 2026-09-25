// import { useEffect, useState } from 'react';
import { Card } from './Card';
import { GameHeader, Moves, Score, Miss, ResetBtn } from './GameHeader';
import { WinMessage } from './WinMessage';
import { useGameLogic } from '../context/GameCardContext';
import { useSharedGame } from '../context/SharedGameContext';
// import { cardValues } from '../src/cardValues';

export const MovesMiss = ({ moves, miss }) => {
  return (
    <>
      <Moves moves={moves} />
      <Miss miss={miss} />
    </>
  );
};

export const GameArea = ({ showAllStats = true, showMsg = true }) => {
  const {
    cards,
    score,
    moves,
    initializeGame,
    handleClick,
    miss,
  } = useGameLogic();
  const { completedGame } = useSharedGame();

  return (
    <div className="game-area">
      <GameHeader>
        <div className="stats">
          <Score score={score} />
          {showAllStats && <MovesMiss moves={moves} miss={miss} />}
        </div>
        {showAllStats && <ResetBtn reset={initializeGame} />}
      </GameHeader>

      {completedGame && showMsg && <WinMessage moves={moves} />}

      <div className="cards-grid">
        {cards.map((card) => (
          <Card key={card.id} card={card} onclick={handleClick} />
        ))}
      </div>
    </div>
  );
};
