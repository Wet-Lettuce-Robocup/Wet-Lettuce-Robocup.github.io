import { HashRouter as Router, Routes, Route } from 'react-router-dom';
import '../styles/App.scss'
import Home from './Home.tsx';
import Team from './Team.tsx';
import Robot from './Robot.tsx';
import Achievements from "./Achievements.tsx";
import NotFound from "./NotFound.tsx";

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
