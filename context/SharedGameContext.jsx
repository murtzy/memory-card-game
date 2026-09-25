/* eslint-disable react-refresh/only-export-components */
import { createContext, useContext, useEffect, useRef, useState } from 'react';

const SharedGameContext = createContext(null);

export const SharedGameProvider = ({ children }) => {
  const [completedGame, setCompletedGame] = useState(false);
  const completedGameRef = useRef(false);
  const [compWin, setCompWin] = useState(false);

  useEffect(() => {
    completedGameRef.current = completedGame;
  }, [completedGame]);

  return (
    <SharedGameContext.Provider
      value={{ completedGame, completedGameRef, setCompletedGame, compWin, setCompWin }}
    >
      {children}
    </SharedGameContext.Provider>
  );
};

export const useSharedGame = () => {
  const contextValue = useContext(SharedGameContext);
  if (!contextValue) {
    throw new Error('useSharedGame must be used inside SharedGameProvider');
  }

  return contextValue;
};
