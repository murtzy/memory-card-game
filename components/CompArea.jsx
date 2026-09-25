import { useCompLogicContext } from '../context/CompLogicContext'
import { Card } from './Card'
import { GameHeader, Score } from './GameHeader'


export const CompArea = () => {
  const {compCards, compScore} = useCompLogicContext()

    return (
        <>
        <div className='game-area'>
          <GameHeader showBtn={false} text='(Computer)'>
            <Score score={compScore}/>
          </GameHeader>

        {}

          <div className="cards-grid">
            {compCards.map(card => <Card card={card} />)}
          </div>
        </div>
        </>
    )
}