import { useEffect, useState } from 'react';
import axios from 'axios';
import PaginaTema from '../../components/PaginaTema';

const glosario = [
  { palabra: 'HTTPS', color: '#4ade80', explicacion: 'HTTP protegido por TLS. Cifra la comunicacion entre navegador y servidor.' },
  { palabra: 'TLS', color: '#34d399', explicacion: 'Transport Layer Security. Protocolo moderno para cifrado, integridad y autenticacion en red.' },
  { palabra: 'SSL', color: '#f87171', explicacion: 'Secure Sockets Layer. Version antigua y deprecada; fue reemplazada por TLS.' },
  { palabra: 'OAuth 2.0', color: '#60a5fa', explicacion: 'Protocolo de autorizacion delegada. Permite conceder acceso sin compartir contrasenas.' },
  { palabra: 'JWT', color: '#fbbf24', explicacion: 'JSON Web Token. Formato compacto de claims firmados, comun en APIs y sesiones stateless.' },
  { palabra: 'SSH', color: '#a78bfa', explicacion: 'Secure Shell. Protocolo cifrado para administrar servidores remotamente.' },
];

const descripcionLateral = [
  'Un protocolo de seguridad define reglas claras para autenticar, cifrar, autorizar y mantener la integridad de una comunicacion.',
  'HTTPS protege el canal, pero no corrige por si solo errores de autorizacion, sesiones mal manejadas o validaciones ausentes.',
  'OAuth 2.0 delega permisos. Para inicio de sesion normalmente se combina con OpenID Connect.',
  'Un JWT es confiable solo si se valida su firma, expiracion, emisor y audiencia. Confiar a ciegas en el payload es peligroso.',
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
      descripcion="Estandares que permiten comunicar sistemas de forma cifrada, autenticada y controlada."
      descripcionLateral={descripcionLateral}
      glosario={glosario}
      puntos={[
        'HTTPS: HTTP sobre TLS; evita que terceros lean o alteren informacion mientras viaja entre cliente y servidor.',
        'TLS/SSL: TLS es el estandar moderno; SSL quedo obsoleto, aunque el nombre se sigue usando informalmente.',
        'OAuth 2.0: permite que una aplicacion acceda a recursos autorizados sin recibir la contrasena del usuario.',
        'JWT: transporta claims firmados; debe tener expiracion corta, algoritmo esperado y validacion estricta.',
        'SSH: permite administracion remota cifrada; es mas seguro con llaves, usuarios limitados y acceso restringido.',
      ]}
      temas={temas}
    />
  );
}

export default Protocolos;
