const express = require('express');
const router = express.Router();
const { getQuizPorCategoria, crearPregunta } = require('../../controllers/quizController');

router.get('/:categoria', getQuizPorCategoria);
router.post('/', crearPregunta);

module.exports = router;