import { BrowserRouter, Route, Routes } from 'react-router';
import { Single } from '../components/Single';
import { Homepage } from '../components/Homepage';
import { VsComp } from '../components/VsComp';
import { GameCardProvider } from '../context/GameCardContext';
import { CompLogicProvider } from '../context/CompLogicContext';
import { SharedGameProvider } from '../context/SharedGameContext';

function App() {
  return (
    <BrowserRouter>
      <SharedGameProvider>
        <GameCardProvider>
          <CompLogicProvider>
            <Routes>
              <Route path="/" element={<Homepage />} />
              <Route path="/single" element={<Single />} />
              <Route path="/vscomp" element={<VsComp />} />
            </Routes>
          </CompLogicProvider>
        </GameCardProvider>
      </SharedGameProvider>
    </BrowserRouter>
  );
}

export default App;
