const mongoose = require('mongoose');
const dotenv = require('dotenv');
const Tema = require('./models/Tema');

dotenv.config();

const datos = [
  {
    titulo: 'Cifrado Simetrico',
    descripcion: 'Tecnica de cifrado que usa una sola clave compartida para proteger y recuperar informacion.',
    categoria: 'criptografia',
    contenido: 'Es rapido y eficiente, por eso se usa para archivos, bases de datos, copias de seguridad y sesiones cifradas. Su punto critico es la distribucion de la clave: si alguien la obtiene, puede descifrar los datos. AES es el estandar moderno; DES y 3DES ya no se recomiendan para sistemas nuevos.'
  },
  {
    titulo: 'Cifrado Asimetrico',
    descripcion: 'Modelo criptografico basado en una clave publica y una clave privada.',
    categoria: 'criptografia',
    contenido: 'Permite intercambiar secretos y verificar identidades sin compartir la clave privada. Si un mensaje se cifra con la clave publica, solo la clave privada puede descifrarlo. Tambien se usa en firmas digitales. RSA y ECC son ejemplos comunes.'
  },
  {
    titulo: 'HTTPS y TLS',
    descripcion: 'HTTPS es HTTP protegido por TLS: cifra la comunicacion entre navegador y servidor.',
    categoria: 'protocolos',
    contenido: 'TLS protege contra lectura, modificacion e interceptacion del trafico. Durante el handshake, cliente y servidor negocian claves, validan certificados y crean una sesion cifrada. HTTPS no reemplaza la autenticacion, autorizacion ni validacion de entradas.'
  },
  {
    titulo: 'JWT - JSON Web Tokens',
    descripcion: 'Formato compacto para transportar informacion firmada entre sistemas.',
    categoria: 'protocolos',
    contenido: 'Un JWT tiene header, payload y firma. El payload normalmente esta codificado, no cifrado, por eso no debe guardar secretos. La seguridad depende de validar firma, expiracion, emisor, audiencia y algoritmo esperado.'
  },
  {
    titulo: 'Hardening de Servidores',
    descripcion: 'Proceso de endurecer un servidor reduciendo servicios expuestos y configuraciones inseguras.',
    categoria: 'servidores',
    contenido: 'Incluye cerrar puertos, aplicar parches, configurar firewall, deshabilitar root remoto, usar llaves SSH, separar permisos, revisar logs y eliminar software innecesario. La meta es reducir la superficie de ataque.'
  },
  {
    titulo: 'Sistemas IDS/IPS',
    descripcion: 'Herramientas que detectan actividad sospechosa y, en algunos casos, bloquean ataques.',
    categoria: 'deteccion',
    contenido: 'Un IDS genera alertas; un IPS puede bloquear trafico malicioso automaticamente. Funcionan mejor con reglas actualizadas, buena ubicacion en la red, correlacion con logs y revision humana.'
  },
  {
    titulo: 'Ataque XSS',
    descripcion: 'Vulnerabilidad que permite ejecutar JavaScript malicioso en el navegador de otros usuarios.',
    categoria: 'tecnicas',
    contenido: 'Puede robar sesiones, alterar contenido o actuar como la victima. Se previene con escape contextual, validacion, sanitizacion, Content Security Policy y evitando insertar HTML no confiable.'
  },
  {
    titulo: 'SQL Injection',
    descripcion: 'Ataque que manipula consultas SQL mediante entradas de usuario no protegidas.',
    categoria: 'tecnicas',
    contenido: 'Puede leer, modificar o eliminar datos, e incluso saltarse autenticacion. La defensa principal es usar consultas preparadas o parametros enlazados, junto con permisos minimos y validacion.'
  }
];

const insertarDatos = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI);
    await Tema.deleteMany();
    await Tema.insertMany(datos);
    console.log('Datos insertados correctamente');
    process.exit();
  } catch (error) {
    console.error('Error:', error.message);
    process.exit(1);
  }
};

insertarDatos();
