import { Navigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

function RutaProtegida({ children }) {
  const { estaAutenticado, cargando } = useAuth();

  if (cargando) return (
    <div style={{ padding: '3rem', textAlign: 'center', color: '#60a5fa' }}>
      Verificando sesión...
    </div>
  );

  return estaAutenticado ? children : <Navigate to="/login" />;
}

export default RutaProtegida;