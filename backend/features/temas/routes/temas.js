const express = require('express');
const router = express.Router();
const { getTemas, getTemasPorCategoria, crearTema, getTemaById, editarTema, eliminarTema } = require('../../controllers/temasController');

router.get('/', getTemas);
router.get('/categoria/:categoria', getTemasPorCategoria);
router.get('/:id', getTemaById);
router.post('/', crearTema);
router.put('/:id', editarTema);
router.delete('/:id', eliminarTema);

module.exports = router;