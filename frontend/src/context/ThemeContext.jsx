import { createContext, useContext, useEffect, useState } from 'react';

const preferenciasBase = { tema: 'oscuro', notificaciones: true, modoEstudio: false };
const ThemeContext = createContext();

function leerPreferencias() {
  try {
    return { ...preferenciasBase, ...JSON.parse(localStorage.getItem('segweb_preferencias')) };
  } catch {
    return preferenciasBase;
  }
}

export function ThemeProvider({ children }) {
  const [preferencias, setPreferencias] = useState(leerPreferencias);

  useEffect(() => {
    localStorage.setItem('segweb_preferencias', JSON.stringify(preferencias));
    document.documentElement.dataset.theme = preferencias.tema;
  }, [preferencias]);

  const actualizarPreferencia = (campo, valor) => {
    setPreferencias(prev => ({ ...prev, [campo]: valor }));
  };

  return (
    <ThemeContext.Provider value={{ preferencias, actualizarPreferencia }}>
      {children}
    </ThemeContext.Provider>
  );
}

export const useTheme = () => useContext(ThemeContext);
