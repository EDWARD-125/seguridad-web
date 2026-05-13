import { useEffect, useState } from 'react';
import axios from 'axios';
import PaginaTema from '../../components/PaginaTema';

const glosario = [
  { palabra: 'AES', color: '#60a5fa', explicacion: 'Advanced Encryption Standard. Cifrado simetrico moderno usado para proteger datos en reposo y en transito.' },
  { palabra: 'DES', color: '#f87171', explicacion: 'Data Encryption Standard. Algoritmo historico de 56 bits; hoy se considera inseguro.' },
  { palabra: 'RSA', color: '#4ade80', explicacion: 'Algoritmo asimetrico basado en claves publica y privada. Se usa para intercambio de claves y firmas digitales.' },
  { palabra: 'ECC', color: '#a78bfa', explicacion: 'Criptografia de curva eliptica. Ofrece seguridad fuerte con claves mas pequenas que RSA.' },
  { palabra: 'SHA-256', color: '#fbbf24', explicacion: 'Funcion hash de 256 bits. Genera una huella fija para verificar integridad.' },
  { palabra: 'MD5', color: '#f87171', explicacion: 'Funcion hash obsoleta vulnerable a colisiones. No debe usarse para seguridad.' },
  { palabra: 'SSL', color: '#34d399', explicacion: 'Protocolo antiguo predecesor de TLS. Esta deprecado, aunque el nombre aun se usa de forma informal.' },
  { palabra: 'TLS', color: '#34d399', explicacion: 'Protocolo moderno que protege HTTPS mediante cifrado, integridad y autenticacion del servidor.' },
];

const descripcionLateral = [
  'La criptografia protege confidencialidad, integridad y autenticidad: no solo oculta datos, tambien ayuda a demostrar que no fueron alterados.',
  'El cifrado simetrico es rapido y eficiente; por eso suele proteger grandes volumenes de datos una vez existe una clave compartida.',
  'El cifrado asimetrico resuelve el intercambio de claves: puedes compartir una clave publica sin revelar la clave privada.',
  'Una funcion hash no cifra informacion. Crea una huella digital: si cambia un solo caracter, el resultado cambia por completo.',
];

function Criptografia() {
  const [temas, setTemas] = useState([]);

  useEffect(() => {
    axios.get('http://localhost:5000/api/temas/categoria/criptografia')
      .then(res => setTemas(res.data))
      .catch(err => console.error(err));
  }, []);

  return (
    <PaginaTema
      categoria="criptografia"
      icono="🔐"
      titulo="Criptografia"
      descripcion="Tecnicas que protegen datos para que solo las partes autorizadas puedan leerlos, validarlos o firmarlos."
      descripcionLateral={descripcionLateral}
      glosario={glosario}
      puntos={[
        'Cifrado simetrico: usa una misma clave para cifrar y descifrar; es ideal para archivos, bases de datos y sesiones activas.',
        'Cifrado asimetrico: usa clave publica y privada; permite intercambiar secretos y verificar identidades sin compartir la clave privada.',
        'Hashing: convierte datos en una huella fija; se usa para comprobar integridad y proteger contrasenas junto con sal.',
        'Firma digital: usa una clave privada para demostrar autoria y detectar modificaciones del mensaje firmado.',
        'Certificados SSL/TLS: relacionan una identidad con una clave publica para que el navegador confie en el servidor correcto.',
      ]}
      temas={temas}
    />
  );
}

export default Criptografia;
