import {HashRouter as Router, Routes, Route} from 'react-router-dom';
import './App.css'
import Home from './components/Home';
import Team from './components/Team';
import Robot from './components/Robot';
import Achievements from "./components/Achievements.tsx";
import NotFound from "./components/NotFound.tsx";

function App() {
  return (
    <Router>
        <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/home" element={<Home />} />
            <Route path="/team" element={<Team />} />
            <Route path="/robot" element={<Robot />} />
            <Route path="/achievements" element={<Achievements />} />

            <Route path="*" element={<NotFound />} />
        </Routes>
    </Router>
  )
}

export default App
