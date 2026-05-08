import { createContext, useContext, useState, useEffect } from 'react';
import api from '../api';

const AuthContext = createContext();

export function AuthProvider({ children }) {
  const [usuario, setUsuario] = useState(null);
  const [cargando, setCargando] = useState(true);

  useEffect(() => {
    const usuarioGuardado = localStorage.getItem('usuario');
    const token = localStorage.getItem('token');
    if (usuarioGuardado && token) {
      setUsuario(JSON.parse(usuarioGuardado));
    }
    setCargando(false);
  }, []);

  const login = async (email, password) => {
    const res = await api.post('/auth/login', { email, password });
    localStorage.setItem('token', res.data.token);
    localStorage.setItem('usuario', JSON.stringify(res.data.usuario));
    setUsuario(res.data.usuario);
    return res.data;
  };

  const registro = async (nombre, email, password) => {
    const res = await api.post('/auth/registro', { nombre, email, password });
    localStorage.setItem('token', res.data.token);
    localStorage.setItem('usuario', JSON.stringify(res.data.usuario));
    setUsuario(res.data.usuario);
    return res.data;
  };

  const logout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('usuario');
    setUsuario(null);
  };

  const estaAutenticado = !!usuario;
  const esAdmin = usuario?.rol === 'admin';

  return (
    <AuthContext.Provider value={{ usuario, login, registro, logout, estaAutenticado, esAdmin, cargando }}>
      {children}
    </AuthContext.Provider>
  );
}

export const useAuth = () => useContext(AuthContext);