import { BrowserRouter, Route, Routes } from 'react-router';
import { Single } from '../components/Single';
import { Homepage } from '../components/Homepage';
import { VsComp } from '../components/VsComp';
import { GameCarcProvider } from '../context/GameCardContext';

function App() {
  return (
    <BrowserRouter>
      <GameCarcProvider>
        <Routes>
          <Route path="/" element={<Homepage />} />
          <Route path="/single" element={<Single />} />
          <Route path="/vscomp" element={<VsComp />} />
        </Routes>
      </GameCarcProvider>
    </BrowserRouter>
  );
}

export default App;
