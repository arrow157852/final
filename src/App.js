import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Navbar from './components/layout/Navbar';
import Home from './components/pages/temp/Home';
import FighterForm from './components/pages/cadastro/cadastro';

function App() {
  return (
    <Router>
      <Navbar />
      <main>
        <Routes>
          <Route path="/" element={<Home/>} />
          <Route path="/cadastro" element={<FighterForm />} />
          <Route path="/editar/:id" element={<FighterForm />} />
        </Routes>
      </main>
    </Router>
  );
}

export default App;