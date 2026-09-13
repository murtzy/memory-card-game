/* eslint-disable react-hooks/set-state-in-effect */
import { useEffect, useState } from 'react';
import { GameHistory } from './GameHistory';
import { useGameLogic } from '../context/GameCardContext';
import { GameArea } from './GameArea';

export const Single = () => {
  const { history } = useGameLogic()
  return (
    <div className="app main-layout">
      <GameArea />
      <GameHistory history={history} />
    </div>
  );
};
