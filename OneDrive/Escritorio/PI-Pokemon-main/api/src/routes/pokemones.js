const { Router } = require('express');
const axios = require('axios');
const router = Router();
const { Pokemon, Tipo } = require('../db');
const { Op } = require('sequelize');

//antes de cambiarlo 
router.get('/name', async (req, res) => {
  try {
    const name = req.query.name;
    let pokemones = [];

    if (name) {
      pokemones = await Pokemon.findAll({
        where: {
          Nombre: {
            [Op.iLike]: `%${name}%`,
          },
        },
        include: Tipo, // Incluye los tipos del Pokémon en la búsqueda
      });

      if (pokemones.length === 0) {
        const name = req.query.name.toLowerCase();
        const response = await axios.get(`https://pokeapi.co/api/v2/pokemon/${name}`);
        const apiData = response.data;

        const pokemonData = {
          id: apiData.id,
          nombre: apiData.name,
          imagen: apiData.sprites.front_default,
          tipo: apiData.types.map(type => type.type.name).join(', '),
        };
        return res.json(pokemonData);
      }
    }

    // Simplifica la respuesta para mostrar solo id, nombre, imagen y tipo
    const simplifiedPokemones = pokemones.map(pokemon => ({
      id: pokemon.ID,
      nombre: pokemon.Nombre,
      imagen: pokemon.Imagen,
      tipo: pokemon.Tipos.map(tipo => tipo.Nombre).join(', '),
    }));

    return res.json(simplifiedPokemones);
  } catch (error) {
    return res.status(500).json({ error: 'Error al obtener la información de los Pokémon.' });
  }
});





router.get('/', async (req, res) => {
  console.log('Ruta ejecutada.');
  try {//antes
    const nombre = req.query.nombre;
    const pagina = req.query.pagina || 1;
    let pokemones = [];

    // Buscar en la base de datos local
    const whereClause = nombre ? { Nombre: nombre } : {};
    pokemones = await Pokemon.findAll({ where: whereClause });

    // Normalizar los datos de la base de datos local
    const dbPokemones = pokemones.map(pokemon => ({
      id: pokemon.ID,
      name: pokemon.Nombre,
      image: pokemon.Imagen,
      type: pokemon.Tipos,
      // ... otros campos ...
    }));

    // Buscar en la API de Pokémon
    const offset = req.query.offset || 0;
    const limit = req.query.limit || 10;

    const response = await axios.get(`https://pokeapi.co/api/v2/pokemon?offset=${offset}&limit=${limit}`);
    const apiData = response.data.results;

    // Normalizar los datos de la API de Pokémon
    const apiPokemones = apiData.map(async (pokemon) => {
      console.log(pokemon)
      const pokemonDetails = await axios.get(pokemon.url);
      return {
        id: pokemonDetails.data.id,
        name: pokemon.name,
        image: pokemonDetails.data.sprites.front_default,
        type: pokemonDetails.data.types.map(type => type.type.name),
        // ... otros campos ...
      };
    });

    // Combinar los resultados de la base de datos local y la API
    pokemones = [...dbPokemones, ...await Promise.all(apiPokemones)];

    console.log('informacion',pokemones);
    return res.json(pokemones);
  } catch (error) {
    return res.status(500).json({ error: 'Error al obtener la información de los Pokémon.' });
  }
});





router.get('/:id', async (req, res) => {
  try {
    const { id } = req.params;

    if (id.length > 10) {
      const pokemonDB = await Pokemon.findByPk(id, {
        include: Tipo, // Incluye los tipos del Pokémon
      });

      if (!pokemonDB) {
        return res.status(404).json({ error: 'No se encontró un Pokémon con ese ID' });
      }

      // Simplifica la respuesta para mostrar solo los nombres de los tipos
      const types = pokemonDB.Tipos.map(tipo => tipo.Nombre).join(', ');

      return res.json({ ...pokemonDB.toJSON(), Tipos: types });
    } else {
      const pokemonApi = await axios.get(`https://pokeapi.co/api/v2/pokemon/${id}`);
      const apiData = pokemonApi.data;

      const pokemonData = {
        id: apiData.id,
        nombre: apiData.name,
        imagen: apiData.sprites.front_default,
        vida: apiData.stats.find(stat => stat.stat.name === 'hp').base_stat,
        ataque: apiData.stats.find(stat => stat.stat.name === 'attack').base_stat,
        defensa: apiData.stats.find(stat => stat.stat.name === 'defense').base_stat,
        velocidad: apiData.stats.find(stat => stat.stat.name === 'speed')?.base_stat,
        altura: apiData.height,
        peso: apiData.weight,
        tipo: apiData.types.map(type => type.type.name).join(', '),
      };

      return res.json(pokemonData);
    }
  } catch (error) {
    return res.status(500).json({ error: 'Error al obtener la información del Pokémon.' });
  }
});


module.exports = router;
