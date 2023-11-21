const { Router } = require('express');
const router = Router();
const axios = require('axios');
const { Tipo } = require('../db');

router.get('/', async (req, res) => {
    try {
        let tipos = await Tipo.findAll({
            attributes: ['ID', 'Nombre']
          });

        if (tipos.length === 0) {
            const response = await axios.get(`https://pokeapi.co/api/v2/type`);
            const allTipos = response.data.results.map(pokemon => pokemon.name);


            await Promise.all(allTipos.map(tipo => Tipo.findOrCreate({ where: { Nombre: tipo }})));

            tipos = await Tipo.findAll();
        }

        return res.json(tipos);
    } catch (error) {
        res.status(500).send("Error al obtener los tipos de Pokémon");
    }
});

module.exports = router;
