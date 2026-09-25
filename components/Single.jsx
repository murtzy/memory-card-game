/* eslint-disable react-hooks/set-state-in-effect */
import { GameHistory } from './GameHistory';
import { useGameLogic } from '../context/GameCardContext';
import { GameArea } from './GameArea';
import { useEffect } from 'react';

export const Single = () => {
  const { history, initializeGame } = useGameLogic();

  useEffect(() => {
    initializeGame()
  }, [])

  return (
    <div className="app main-layout">
      <GameArea />
      <GameHistory history={history} />
    </div>
  );
};
