import { Routes, Route, useLocation, Navigate } from 'react-router-dom';
import { useAuth } from './context/AuthContext';
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
import Perfil from './pages/Perfil';
import Configuracion from './pages/Configuracion';
import Estadisticas from './pages/Estadisticas';
import MisQuizzes from './pages/MisQuizzes';

function RutaProtegida({ children }) {
  const { estaAutenticado, cargando } = useAuth();
  if (cargando) return (
    <div style={{ padding: '3rem', textAlign: 'center', color: '#60a5fa' }}>
      Verificando sesión...
    </div>
  );
  return estaAutenticado ? children : <Navigate to="/login" />;
}

function AppContenido() {
  const location = useLocation();
  const { estaAutenticado } = useAuth();
  const esLogin = location.pathname === '/login';

  return (
    <>
      <FondoCircuito />
      {!esLogin && <Navbar />}
      <div style={{ position: 'relative', zIndex: 1 }}>
        <Routes>
          {/* Pública */}
          <Route path="/login" element={<Login />} />

          {/* Protegidas */}
          <Route path="/" element={<RutaProtegida><Home /></RutaProtegida>} />
          <Route path="/criptografia" element={<RutaProtegida><Criptografia /></RutaProtegida>} />
          <Route path="/protocolos" element={<RutaProtegida><Protocolos /></RutaProtegida>} />
          <Route path="/servidores" element={<RutaProtegida><SeguridadServidores /></RutaProtegida>} />
          <Route path="/deteccion" element={<RutaProtegida><DeteccionAtaques /></RutaProtegida>} />
          <Route path="/tecnicas" element={<RutaProtegida><TecnicasAtaque /></RutaProtegida>} />
          <Route path="/tema/:id" element={<RutaProtegida><DetalleTema /></RutaProtegida>} />
          <Route path="/nuevo" element={<RutaProtegida><NuevoTema /></RutaProtegida>} />
          <Route path="/editar/:id" element={<RutaProtegida><EditarTema /></RutaProtegida>} />
          <Route path="/buscar" element={<RutaProtegida><Buscador /></RutaProtegida>} />
          <Route path="/quiz/:categoria" element={<RutaProtegida><Quiz /></RutaProtegida>} />
          <Route path="/perfil" element={<RutaProtegida><Perfil /></RutaProtegida>} />
          <Route path="/configuracion" element={<RutaProtegida><Configuracion /></RutaProtegida>} />
          <Route path="/estadisticas" element={<RutaProtegida><Estadisticas /></RutaProtegida>} />
          <Route path="/mis-quizzes" element={<RutaProtegida><MisQuizzes /></RutaProtegida>} />

          {/* Redirigir rutas desconocidas segun la sesion */}
          <Route path="*" element={<Navigate to={estaAutenticado ? '/' : '/login'} />} />
        </Routes>
      </div>
    </>
  );
}

function App() {
  return <AppContenido />;
}

export default App;
