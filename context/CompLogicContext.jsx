/* eslint-disable react-hooks/set-state-in-effect */
/* eslint-disable react-refresh/only-export-components */
import { createContext, useContext, useEffect, useState, useRef } from 'react';
import { cardValues } from '../src/cardValues';
import { useSharedGame } from './SharedGameContext';

const CompLogicContext = createContext(null);

export const CompLogicProvider = ({ children, isiCardValue = cardValues }) => {
  const { completedGame, completedGameRef, setCompletedGame, compWin, setCompWin } = useSharedGame();

  const [compCards, setCompCards] = useState([]);
  const [compScore, setCompScore] = useState(0);
  const [compMatched, setCompMatched] = useState([]);
  const [overlay, setOverlay] = useState(true);

  const overlayRef = useRef(true);

  const shuffledArray = (array) => {
    const shuffled = [...array];
    for (let i = shuffled.length - 1; i > 0; i -= 1) {
      const j = Math.floor(Math.random() * (i + 1));
      [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
    }
    return shuffled;
  };

  const initializeGameComp = () => {
    const shuffled = shuffledArray(isiCardValue);
    const finalCard = shuffled.map((value, index) => ({
      id: index,
      value,
      isFlipped: false,
      isMatched: false,
    }));

    setCompCards(finalCard);
    setCompScore(0);
    setCompMatched([]);
    // setOverlay(true);
  };

  useEffect(() => {
    initializeGameComp();
  }, []);

  useEffect(() => {
    if (completedGame && !compWin) {
      alert('Selesai : Kamu Menang');
      return;
    }
  }, [completedGame, compWin]);

  useEffect(() => {
    overlayRef.current = overlay;
  }, [overlay]);

  const pickRandomCard = (cards, optional = [], matchedSoFar = compMatched) => {
    const notMatched = cards.filter(
      (card) =>
        !card.isMatched &&
        !matchedSoFar.includes(card.id) &&
        !optional.includes(card.id)
    );
    if (notMatched.length === 0) return;

    return notMatched[Math.floor(Math.random() * notMatched.length)];
  };

  const firstCompTurn = (cards, matchedSoFar = [], scoreSoFar = 0) => {
    if (completedGameRef.current) return;

    const randomCard = pickRandomCard(cards, [], matchedSoFar);
    if (!randomCard) return;

    const newCards = cards.map((card) =>
      card.id === randomCard.id ? { ...card, isFlipped: true } : card
    );
    setCompCards(newCards);
    const newFlippedCards = [randomCard.id];

    setTimeout(() => {
      secondCardTurn(
        newFlippedCards,
        newCards,
        randomCard,
        matchedSoFar,
        scoreSoFar
      );
    }, 100);
  };

  const secondCardTurn = (
    flippedCards,
    allNewCards,
    firstRandomCard,
    matchedSoFar,
    scoreSoFar
  ) => {
    const randomCard = pickRandomCard(allNewCards, flippedCards, matchedSoFar);

    if (!randomCard) {
      const guardedCards = allNewCards.map((card) =>
        card.id === firstRandomCard.id ? { ...card, isFlipped: false } : card
      );
      setTimeout(
        () => firstCompTurn(guardedCards, matchedSoFar, scoreSoFar),
        1000
      );
      return;
    }

    const newSecondCard = allNewCards.map((card) =>
      card.id === randomCard.id ? { ...card, isFlipped: true } : card
    );
    setCompCards(newSecondCard);

    const newFlippedCards = [...flippedCards, randomCard.id];
    const firstCard = allNewCards.find((card) => card.id === flippedCards[0]);

    if (firstCard.value === randomCard.value) {
      setTimeout(() => {
        const newMatchedCards = [...matchedSoFar, firstCard.id, randomCard.id];
        const newScore = scoreSoFar + 1;
        const matchedCards = newSecondCard.map((card) =>
          newMatchedCards.includes(card.id)
            ? { ...card, isFlipped: true, isMatched: true }
            : card
        );

        setCompMatched(newMatchedCards);
        setCompScore(newScore);
        setCompCards(matchedCards);

        if (newMatchedCards.length === matchedCards.length) {
          alert('Selesai : Computer Menang');
          setCompletedGame(true);
          setCompWin(true)
          completedGameRef.current = true;
          overlayRef.current = false;
          return;
        }

        setTimeout(
          () => firstCompTurn(matchedCards, newMatchedCards, newScore),
          500
        );
      }, 100);
      return;
    }

    setTimeout(() => {
      const flippedBackCards = newSecondCard.map((card) =>
        newFlippedCards.includes(card.id) ? { ...card, isFlipped: false } : card
      );

      setCompCards(flippedBackCards);
      setTimeout(
        () => firstCompTurn(flippedBackCards, matchedSoFar, scoreSoFar),
        500
      );
    }, 100);
  };

  return (
    <CompLogicContext.Provider
      value={{
        compCards,
        compScore,
        firstCompTurn,
        overlay,
        setOverlay,
        initializeGameComp,
        overlayRef,
      }}
    >
      {children}
    </CompLogicContext.Provider>
  );
};

export const useCompLogicContext = () => {
  const contextValue = useContext(CompLogicContext);
  if (!contextValue) {
    throw new Error(
      'useCompLogicContext must be used inside CompLogicProvider'
    );
  }

  return contextValue;
};
