import { useEffect, useState } from 'react';
import axios from 'axios';
import PaginaTema from '../../components/PaginaTema';

const glosario = [
  { palabra: 'AES', color: '#60a5fa', explicacion: 'Advanced Encryption Standard. Cifrado simétrico más usado hoy. Usa claves de 128, 192 o 256 bits.' },
  { palabra: 'DES', color: '#f87171', explicacion: 'Data Encryption Standard. Cifrado antiguo de 56 bits, considerado inseguro hoy en día.' },
  { palabra: 'RSA', color: '#4ade80', explicacion: 'Rivest–Shamir–Adleman. Cifrado asimétrico basado en factorización de números primos grandes.' },
  { palabra: 'ECC', color: '#a78bfa', explicacion: 'Elliptic Curve Cryptography. Cifrado asimétrico más eficiente que RSA con claves más cortas.' },
  { palabra: 'SHA-256', color: '#fbbf24', explicacion: 'Secure Hash Algorithm 256 bits. Función hash usada en Bitcoin y certificados SSL.' },
  { palabra: 'MD5', color: '#f87171', explicacion: 'Message Digest 5. Función hash obsoleta y vulnerable a colisiones. No usar para seguridad.' },
  { palabra: 'SSL', color: '#34d399', explicacion: 'Secure Sockets Layer. Protocolo de seguridad predecesor de TLS. Actualmente deprecado pero el término se sigue usando.' },
  { palabra: 'TLS', color: '#34d399', explicacion: 'Transport Layer Security. Versión moderna y segura de SSL. Es el protocolo que protege HTTPS hoy en día.' },
];

const descripcionLateral = [
  'El cifrado existe desde hace más de 2000 años. Julio César usaba un cifrado por sustitución simple.',
  'AES fue seleccionado por el NIST en 2001 tras un concurso internacional de 5 años.',
  'Un ordenador tardaría miles de millones de años en romper AES-256 por fuerza bruta.',
  'WhatsApp, Signal y Telegram usan cifrado de extremo a extremo basado en estos algoritmos.',
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
      titulo="Criptografía"
      descripcion="Técnicas y algoritmos para proteger la información."
      descripcionLateral={descripcionLateral}
      glosario={glosario}
      puntos={[
        'Cifrado simétrico: AES, DES — misma clave para cifrar y descifrar',
        'Cifrado asimétrico: RSA, ECC — clave pública y privada',
        'Hashing: SHA-256, MD5 — funciones de una sola vía',
        'Firma digital — autenticidad e integridad de datos',
        'Certificados SSL/TLS — identidad de servidores web',
      ]}
      temas={temas}
    />
  );
}

export default Criptografia;