import {BrowserRouter, Route, Routes} from 'react-router'
import { Single } from './components/Single';
import { Homepage } from './components/Homepage';
import { VsComp } from './components/VsComp';

function App() {
	return (
    <BrowserRouter>
      <Routes>
        <Route path='/' element={<Homepage />} />
        <Route path='/single' element={<Single />} />
        <Route path='/vscomp' element={<VsComp />} />
      </Routes>
    </BrowserRouter>
	);
}

export default App;
