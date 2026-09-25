import { useEffect } from 'react';
import { useCompLogicContext } from '../context/CompLogicContext';
import { useGameLogic } from '../context/GameCardContext';
import { useSharedGame } from '../context/SharedGameContext';
import { CompArea } from './CompArea';
import { GameArea } from './GameArea';

export const VsComp = () => {
  const { overlay, setOverlay, firstCompTurn, compCards, initializeGameComp,} =
    useCompLogicContext();
  const { initializeGame } = useGameLogic();
  const {
    completedGame,
    completedGameRef,
    setCompletedGame,
    setCompWin,
  } = useSharedGame();


  useEffect(() => {
    initializeGameComp()
    initializeGame()
  }, [])

  return (
    <div className="vscomp-page">
      <div className={`overlay ${overlay ? '' : 'hidden'}`}>
        <button
          className="btn-mulai"
          onClick={() => {
            setCompletedGame(false);
            setCompWin(false);
            completedGameRef.current = false;
            setOverlay(false);
            firstCompTurn(compCards);
          }}
        >
          Mulai
        </button>
      </div>
      <div className="vscomp">
        <CompArea />
        <button
          className={`reset-btn ${!completedGame || overlay ? 'hidden' : ''}`}
          onClick={() => {
            setOverlay(true);
            setCompletedGame(false);
            setCompWin(false);
            completedGameRef.current = false;
            initializeGame();
            initializeGameComp();
          }}
        >
          Restart
        </button>
        <GameArea showAllStats={false} showMsg={false} />
      </div>
    </div>
  );
};
