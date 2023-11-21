const { Router } = require('express');
// Importar todos los routers;
const pokemones = require('./pokemones');
const tipos = require('./tipos');
const crearPokemon = require('./crearPokemon')
// Ejemplo: const authRouter = require('./auth.js');


const router = Router();
router.use('/pokemons', pokemones);
router.use('/types', tipos);
router.use('/crear', crearPokemon);


// Configurar los routers
// Ejemplo: router.use('/auth', authRouter);


module.exports = router;
