/* eslint-disable react-refresh/only-export-components */
import { useContext, createContext, useState, useEffect } from 'react';
import { cardValues } from '../src/cardValues';

const GameCardContext = createContext();

export const GameCarcProvider = ({ children }) => {
  const [cards, setCards] = useState([]);
  const [flippedCards, setFlippedCards] = useState([]);
  const [MatchedCards, setMatchedCards] = useState([]);
  const [locked, setLocked] = useState(false);
  const [score, setScore] = useState(0);
  const [moves, setMoves] = useState(0);
  const [miss, setMiss] = useState(0);
  const [history, setHistory] = useState([]);

  const shuffledArray = (array) => {
    const shuffled = [...array];
    for (let i = shuffled.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
    }
    return shuffled;
  };

  const initializeGame = () => {
    const shuffled = shuffledArray(cardValues);

    const finalCard = shuffled.map((value, index) => ({
      id: index,
      value,
      isFlipped: false,
      isMatched: false,
    }));

    setCards(finalCard);
    setFlippedCards([]);
    setMatchedCards([]);
    setScore(0);
    setMoves(0);
    setMiss(0);
  };

  useEffect(() => {
    initializeGame();
  }, []);

  const handleClick = (cardClicked) => {
    // tdk bisa diklik ketika isMatched : true atau isFlipped : true atau locked : true
    if (
      locked ||
      cardClicked.isFlipped ||
      cardClicked.isMatched ||
      flippedCards.length === 2
    ) {
      return;
    }

    // update state card
    const newCards = cards.map((cardState) => {
      if (cardState.id === cardClicked.id) {
        // stiap (cardState) dicek & dibandingkan id-nya dgn card.id
        return { ...cardState, isFlipped: true };
        // card yg cocok terubah
      } else {
        // selain card yg diklik maka di-return sprti sebelumnya
        return cardState;
      }
    });
    setCards(newCards);

    const newFlippedCards = [...flippedCards, cardClicked.id];
    setFlippedCards(newFlippedCards);
    // flippedCards = [...[], id] ==> flippedCards = [id/int]

    if (flippedCards.length === 1) {
      const firstCard = cards[flippedCards[0]];
      // cards[id/int] => ambil array index ke-[id/int] berupa obj {id,value,isFlipped,..}

      if (firstCard.value === cardClicked.value) {
        setLocked(true); // terkunci
        // setMatchedCards((prev) => [...prev, firstCard.id, cardClicked.id]);
        // setScore((prev) => prev + 1);
        setTimeout(() => {
          const newMatchedCards = [
            ...MatchedCards,
            firstCard.id,
            cardClicked.id,
          ];
          const newScore = score + 1;

          setMatchedCards(newMatchedCards);
          setScore(newScore);

          setCards((prev) =>
            prev.map((c) => {
              if (c.id === cardClicked.id || c.id === firstCard.id) {
                return { ...c, isFlipped: true, isMatched: true };
              } else {
                return c;
              }
            })
          );

          setLocked(false);
          setFlippedCards([]);

          // cek apakah game selesai TEPAT di titik ini
          if (newMatchedCards.length === cardValues.length) {
            const entry = {
              id: `${Date.now()}-${Math.random().toString(16).slice(2)}`,
              score: newScore,
              moves: moves + 1, // +1 karena setMoves di bawah belum ter-apply
              miss,
            };
            setHistory((prev) =>
              [entry, ...prev].sort((a, b) => a.moves - b.moves)
            );
          }
        }, 500);
      } else {
        // flip back
        setTimeout(() => {
          const flippedBackCards = newCards.map((c) => {
            if (newFlippedCards.includes(c.id)) {
              return { ...c, isFlipped: false };
            } else {
              return c;
            }
          });

          setCards(flippedBackCards);
          setLocked(false);
          setFlippedCards([]);
          setMiss((prev) => prev + 1);
        }, 500);
      }
      setMoves((prev) => prev + 1);
    }
  };

  return (
    <GameCardContext.Provider
      value={{
        cards,
        score,
        moves,
        initializeGame,
        handleClick,
        miss,
        history,
        setHistory,
      }}
    >
      {children}
    </GameCardContext.Provider>
  );
};

export const useGameLogic = () => {
  const contextValue = useContext(GameCardContext);
  if (!contextValue) {
    throw new Error('');
  }

  return contextValue;
};
