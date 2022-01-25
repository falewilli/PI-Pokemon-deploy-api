const { Router } = require('express');

const pokemons = require('./pokemons.js');
const types = require('./types.js');

// Importar todos los routers;
// Ejemplo: const authRouter = require('./auth.js');
// const functions = require('./functions.js')
// const pokemons = require('./pokemons.js')
// const types = require('./types.js')
// const axios = require ('axios');
// const { Pokemon, Type } = require('../db');


const router = Router();

router.use('/pokemons', pokemons);

router.use('/types', types);

module.exports = router;
