const express = require('express');
const router = express.Router();
const jwt = require('jsonwebtoken');
const User = require('../models/User');
const { protect } = require('../middleware/authMiddleware');

const generarToken = (usuario) => jwt.sign(
  { id: usuario._id, rol: usuario.rol, nombre: usuario.nombre, email: usuario.email },
  process.env.JWT_SECRET,
  { expiresIn: '24h' }
);

const obtenerBaseBackend = () => process.env.BACKEND_URL || `http://localhost:${process.env.PORT || 5000}`;
const obtenerBaseFrontend = () => process.env.FRONTEND_URL || 'http://localhost:5173';

const oauthConfig = {
  github: {
    clientId: 'GITHUB_CLIENT_ID',
    clientSecret: 'GITHUB_CLIENT_SECRET',
    authorizeUrl: 'https://github.com/login/oauth/authorize',
    tokenUrl: 'https://github.com/login/oauth/access_token',
    scope: 'read:user user:email'
  },
  google: {
    clientId: 'GOOGLE_CLIENT_ID',
    clientSecret: 'GOOGLE_CLIENT_SECRET',
    authorizeUrl: 'https://accounts.google.com/o/oauth2/v2/auth',
    tokenUrl: 'https://oauth2.googleapis.com/token',
    scope: 'openid email profile'
  },
  microsoft: {
    clientId: 'MICROSOFT_CLIENT_ID',
    clientSecret: 'MICROSOFT_CLIENT_SECRET',
    scope: 'openid email profile User.Read'
  }
};

const proveedoresOAuth = ['github', 'google', 'microsoft'];

const getMicrosoftBase = () => {
  const tenant = process.env.MICROSOFT_TENANT_ID || 'common';
  return `https://login.microsoftonline.com/${tenant}/oauth2/v2.0`;
};

const getRedirectUri = (proveedor) => `${obtenerBaseBackend()}/api/auth/${proveedor}/callback`;

const generarStateOAuth = (proveedor) => jwt.sign(
  { proveedor, nonce: Math.random().toString(36).slice(2) },
  process.env.JWT_SECRET,
  { expiresIn: '10m' }
);

const validarStateOAuth = (proveedor, state) => {
  if (!state) throw new Error('Estado OAuth faltante');
  const decoded = jwt.verify(state, process.env.JWT_SECRET);
  if (decoded.proveedor !== proveedor) throw new Error('Estado OAuth invÃ¡lido');
};

const requireOAuthEnv = (proveedor) => {
  const config = oauthConfig[proveedor];
  if (!config || !process.env[config.clientId] || !process.env[config.clientSecret]) {
    throw new Error(`Faltan credenciales OAuth para ${proveedor}`);
  }
  return config;
};

const fetchJson = async (url, options) => {
  const response = await fetch(url, options);
  const data = await response.json();
  if (!response.ok) {
    throw new Error(data.error_description || data.error || 'Error en proveedor OAuth');
  }
  return data;
};

const intercambiarCodigoPorToken = async (proveedor, code) => {
  const config = requireOAuthEnv(proveedor);
  const tokenUrl = proveedor === 'microsoft' ? `${getMicrosoftBase()}/token` : config.tokenUrl;

  return fetchJson(tokenUrl, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/x-www-form-urlencoded',
      Accept: 'application/json'
    },
    body: new URLSearchParams({
      client_id: process.env[config.clientId],
      client_secret: process.env[config.clientSecret],
      code,
      redirect_uri: getRedirectUri(proveedor),
      grant_type: 'authorization_code'
    })
  });
};

const obtenerPerfilOAuth = async (proveedor, accessToken) => {
  if (proveedor === 'github') {
    const perfil = await fetchJson('https://api.github.com/user', {
      headers: { Authorization: `Bearer ${accessToken}`, Accept: 'application/vnd.github+json' }
    });
    let email = perfil.email;
    if (!email) {
      const emails = await fetchJson('https://api.github.com/user/emails', {
        headers: { Authorization: `Bearer ${accessToken}`, Accept: 'application/vnd.github+json' }
      });
      email = emails.find(item => item.primary && item.verified)?.email || emails[0]?.email;
    }
    return { proveedorId: String(perfil.id), nombre: perfil.name || perfil.login, email };
  }

  if (proveedor === 'google') {
    const perfil = await fetchJson('https://openidconnect.googleapis.com/v1/userinfo', {
      headers: { Authorization: `Bearer ${accessToken}` }
    });
    return { proveedorId: perfil.sub, nombre: perfil.name || perfil.email, email: perfil.email };
  }

  const perfil = await fetchJson('https://graph.microsoft.com/v1.0/me', {
    headers: { Authorization: `Bearer ${accessToken}` }
  });
  return {
    proveedorId: perfil.id,
    nombre: perfil.displayName || perfil.userPrincipalName,
    email: perfil.mail || perfil.userPrincipalName
  };
};

const obtenerOCrearUsuarioOAuth = async (proveedor, perfil) => {
  if (!perfil.email) throw new Error('El proveedor no devolviÃ³ un email verificable');

  let usuario = await User.findOne({ email: perfil.email });
  if (!usuario) {
    usuario = await User.create({
      nombre: perfil.nombre,
      email: perfil.email,
      proveedorAuth: proveedor,
      proveedorId: perfil.proveedorId
    });
  } else {
    usuario.proveedorAuth = usuario.proveedorAuth === 'local' ? proveedor : usuario.proveedorAuth;
    usuario.proveedorId = usuario.proveedorId || perfil.proveedorId;
    await usuario.save();
  }

  return usuario;
};

const redirigirConSesion = (res, usuario) => {
  const token = generarToken(usuario);
  const usuarioSeguro = {
    id: usuario._id,
    nombre: usuario.nombre,
    email: usuario.email,
    rol: usuario.rol,
    proveedorAuth: usuario.proveedorAuth
  };

  const params = new URLSearchParams({
    token,
    usuario: JSON.stringify(usuarioSeguro)
  });

  res.redirect(`${obtenerBaseFrontend()}/?${params.toString()}`);
};

// Registro
router.post('/registro', async (req, res) => {
  try {
    const { nombre, email, password } = req.body;
    const existe = await User.findOne({ email });
    if (existe) return res.status(400).json({ mensaje: 'El email ya está registrado' });
    const usuario = new User({ nombre, email, password });
    await usuario.save();
    const token = generarToken(usuario);
    res.status(201).json({
      token,
      usuario: { id: usuario._id, nombre, email, rol: usuario.rol }
    });
  } catch (error) {
    console.error('ERROR REGISTRO:', error.message);
    res.status(500).json({ mensaje: 'Error al registrar usuario', detalle: error.message });
  }
});

// Login
router.post('/login', async (req, res) => {
  try {
    const { email, password } = req.body;
    const usuario = await User.findOne({ email });
    if (!usuario) return res.status(401).json({ mensaje: 'Credenciales incorrectas' });
    const valido = await usuario.compararPassword(password);
    if (!valido) return res.status(401).json({ mensaje: 'Credenciales incorrectas' });
    const token = generarToken(usuario);
    res.json({
      token,
      usuario: { id: usuario._id, nombre: usuario.nombre, email, rol: usuario.rol }
    });
  } catch (error) {
    res.status(500).json({ mensaje: 'Error al iniciar sesión' });
  }
});

// Iniciar OAuth con GitHub, Google o Microsoft
router.get('/:proveedor', (req, res, next) => {
  try {
    const { proveedor } = req.params;
    if (!proveedoresOAuth.includes(proveedor)) return next();
    const config = requireOAuthEnv(proveedor);
    const authorizeUrl = proveedor === 'microsoft' ? `${getMicrosoftBase()}/authorize` : config.authorizeUrl;

    const params = new URLSearchParams({
      client_id: process.env[config.clientId],
      redirect_uri: getRedirectUri(proveedor),
      response_type: 'code',
      scope: config.scope,
      state: generarStateOAuth(proveedor),
      prompt: 'select_account'
    });

    res.redirect(`${authorizeUrl}?${params.toString()}`);
  } catch (error) {
    res.status(500).json({ mensaje: error.message });
  }
});

// Callback OAuth
router.get('/:proveedor/callback', async (req, res, next) => {
  try {
    const { proveedor } = req.params;
    if (!proveedoresOAuth.includes(proveedor)) return next();
    const { code, error, state } = req.query;

    // Diagnóstico rápido
    console.log('[OAUTH CALLBACK]', {
      proveedor,
      hasCode: !!code,
      error: error || null,
      statePrefix: typeof state === 'string' ? state.slice(0, 12) : null
    });

    if (error) {
      console.log('[OAUTH CALLBACK] error:', error);
      return res.redirect(`${obtenerBaseFrontend()}/login?oauthError=${encodeURIComponent(error)}`);
    }
    if (!code) {
      console.log('[OAUTH CALLBACK] sin code');
      return res.redirect(`${obtenerBaseFrontend()}/login?oauthError=sin_codigo`);
    }
    validarStateOAuth(proveedor, state);

    const tokens = await intercambiarCodigoPorToken(proveedor, code);
    console.log('[OAUTH CALLBACK] token recibido (keys):', Object.keys(tokens || {}));

    const perfil = await obtenerPerfilOAuth(proveedor, tokens.access_token);
    console.log('[OAUTH CALLBACK] perfil:', { proveedorAuth: proveedor, email: perfil?.email });

    const usuario = await obtenerOCrearUsuarioOAuth(proveedor, perfil);
    console.log('[OAUTH CALLBACK] usuario listo:', { id: usuario?._id, email: usuario?.email, proveedorAuth: usuario?.proveedorAuth });

    redirigirConSesion(res, usuario);
  } catch (error) {
    console.error('ERROR OAUTH:', error.message);
    res.redirect(`${obtenerBaseFrontend()}/login?oauthError=${encodeURIComponent(error.message)}`);
  }
});

// Perfil (protegido)
router.get('/perfil', protect, async (req, res) => {
  try {
    const usuario = await User.findById(req.usuario.id).select('-password');
    res.json(usuario);
  } catch (error) {
    res.status(500).json({ mensaje: 'Error al obtener perfil' });
  }
});

// Logout (el frontend elimina el token)
router.post('/logout', protect, (req, res) => {
  res.json({ mensaje: 'Sesión cerrada correctamente' });
});

module.exports = router;
