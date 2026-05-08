# Estructura del Backend

El backend ha sido reorganizado siguiendo una estructura estándar y profesional.

## 📁 Estructura de Carpetas

```
backend/
├── server.js                 # Punto de entrada principal
├── package.json              # Dependencias del proyecto
├── .env                      # Variables de entorno
│
└── src/
    ├── config/
    │   └── db.js            # Configuración de conexión a MongoDB
    │
    ├── models/
    │   ├── User.js          # Modelo de Usuario
    │   ├── Quiz.js          # Modelo de Quiz
    │   └── Tema.js          # Modelo de Tema
    │
    ├── features/            # Features organizadas por funcionalidad
    │   ├── quiz/
    │   │   ├── controllers/
    │   │   │   └── quizController.js
    │   │   └── routes/
    │   │       └── quiz.js
    │   │
    │   └── temas/
    │       ├── controllers/
    │       │   └── temasController.js
    │       └── routes/
    │           └── temas.js
    │
    ├── routes/              # Router principal (opcional para futuro)
    │
    ├── middleware/          # Middlewares (preparado para autenticación, etc)
    │
    ├── seed.js              # Script para popular datos iniciales
    └── seedQuiz.js          # Script para popular preguntas de quiz
```

## 🚀 Ventajas de la Nueva Estructura

✅ **Modularidad**: Cada feature (quiz, temas) está auto-contenida  
✅ **Escalabilidad**: Fácil agregar nuevas features  
✅ **Mantenibilidad**: Código más organizado y fácil de encontrar  
✅ **Estándar**: Sigue convenciones de proyectos Node.js profesionales  
✅ **Preparado**: Carpeta middleware lista para autenticación y otras funciones  

## 📋 Scripts Disponibles

```bash
# Instalar dependencias
npm install

# Iniciar servidor
npm start

# Ejecutar seed de datos
node src/seed.js
node src/seedQuiz.js
```

## 🔗 Endpoints Actuales

- `GET /api/temas` - Obtener todos los temas
- `GET /api/temas/categoria/:categoria` - Temas por categoría
- `GET /api/temas/:id` - Obtener tema por ID
- `POST /api/temas` - Crear nuevo tema
- `PUT /api/temas/:id` - Editar tema
- `DELETE /api/temas/:id` - Eliminar tema

- `GET /api/quiz/:categoria` - Quiz por categoría
- `POST /api/quiz` - Crear nueva pregunta

## 📝 Próximas Mejoras

- [ ] Agregar autenticación (middleware en `src/middleware/`)
- [ ] Crear rutas centralizadas en `src/routes/index.js`
- [ ] Agregar validación de datos
- [ ] Agregar logging
- [ ] Tests unitarios
