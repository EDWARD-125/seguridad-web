import { Routes, Route, useLocation } from 'react-router-dom';
import Navbar from './components/Navbar';
import FondoCircuito from './components/FondoCircuito';
import Home from './pages/Home';
import Criptografia from './pages/temas/Criptografia';
import Protocolos from './pages/temas/Protocolos';
import SeguridadServidores from './pages/temas/SeguridadServidores';
import DeteccionAtaques from './pages/temas/DeteccionAtaques';
import TecnicasAtaque from './pages/temas/TecnicasAtaque';
import DetalleTema from './pages/tema/DetalleTema';
import NuevoTema from './pages/tema/NuevoTema';
import EditarTema from './pages/tema/EditarTema';
import Buscador from './pages/Buscador';
import Quiz from './pages/quiz/Quiz';
import Login from './pages/auth/Login';

function AppContenido() {
  const location = useLocation();
  const esLogin = location.pathname === '/login';

  return (
    <>
      <FondoCircuito />
      {!esLogin && <Navbar />}
      <div style={{ position: 'relative', zIndex: 1 }}>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/criptografia" element={<Criptografia />} />
          <Route path="/protocolos" element={<Protocolos />} />
          <Route path="/servidores" element={<SeguridadServidores />} />
          <Route path="/deteccion" element={<DeteccionAtaques />} />
          <Route path="/tecnicas" element={<TecnicasAtaque />} />
          <Route path="/tema/:id" element={<DetalleTema />} />
          <Route path="/nuevo" element={<NuevoTema />} />
          <Route path="/editar/:id" element={<EditarTema />} />
          <Route path="/buscar" element={<Buscador />} />
          <Route path="/quiz/:categoria" element={<Quiz />} />
          <Route path="/login" element={<Login />} />
        </Routes>
      </div>
    </>
  );
}

function App() {
  return <AppContenido />;
}

export default App;