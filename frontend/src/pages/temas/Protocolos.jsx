import { useEffect, useState } from 'react';
import axios from 'axios';
import PaginaTema from '../../components/PaginaTema';

const glosario = [
  { palabra: 'HTTPS', color: '#4ade80', explicacion: 'HyperText Transfer Protocol Secure. Versión cifrada de HTTP usando TLS. El candado verde en el navegador.' },
  { palabra: 'TLS', color: '#34d399', explicacion: 'Transport Layer Security. Protocolo que cifra la comunicación entre cliente y servidor.' },
  { palabra: 'SSL', color: '#f87171', explicacion: 'Secure Sockets Layer. Predecesor de TLS, actualmente deprecado e inseguro.' },
  { palabra: 'OAuth 2.0', color: '#60a5fa', explicacion: 'Protocolo de autorización delegada. Permite a apps acceder a recursos sin compartir contraseñas. Usado por Google, Facebook.' },
  { palabra: 'JWT', color: '#fbbf24', explicacion: 'JSON Web Token. Token compacto con 3 partes: header, payload y firma. Usado para autenticación en APIs REST.' },
  { palabra: 'SSH', color: '#a78bfa', explicacion: 'Secure Shell. Protocolo para acceso remoto seguro a servidores mediante cifrado.' },
];

const descripcionLateral = [
  'HTTPS protege más del 95% del tráfico web mundial en 2024.',
  'TLS 1.3 es la versión actual. TLS 1.0 y 1.1 están oficialmente deprecados.',
  'OAuth 2.0 es usado por más de 1 millón de aplicaciones web en el mundo.',
  'Un JWT mal implementado puede ser la puerta de entrada a un ataque masivo.',
];

function Protocolos() {
  const [temas, setTemas] = useState([]);

  useEffect(() => {
    axios.get('http://localhost:5000/api/temas/categoria/protocolos')
      .then(res => setTemas(res.data))
      .catch(err => console.error(err));
  }, []);

  return (
    <PaginaTema
      categoria="protocolos"
      icono="🌐"
      titulo="Protocolos de Seguridad"
      descripcion="Protocolos que garantizan comunicaciones seguras en Internet."
      descripcionLateral={descripcionLateral}
      glosario={glosario}
      puntos={[
        'HTTPS — HTTP sobre TLS, cifra la comunicación web',
        'TLS/SSL — cifrado en la capa de transporte',
        'OAuth 2.0 — autorización delegada entre servicios',
        'JWT — tokens compactos para autenticación en APIs',
        'SSH — acceso remoto seguro a servidores',
      ]}
      temas={temas}
    />
  );
}

export default Protocolos;