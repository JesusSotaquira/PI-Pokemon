const { Router } = require('express');
const router = Router();
const { Pokemon, Tipo } = require('../db');


router.post('/',  async (req, res) => {
    const tiposSeleccionados = req.body.tiposSeleccionados;

    try {
        // Busca los IDs de los tipos seleccionados en la base de datos
        const tipoIds = await Tipo.findAll({
            where: { Nombre: tiposSeleccionados }
        });

        if (tipoIds.length !== tiposSeleccionados.length) {
            return res.status(400).send("No se encontraron todos los tipos seleccionados en la base de datos");
        }

        const {
            Nombre,
            Imagen,
            Vida,
            Ataque,
            Defensa,
            Velocidad,
            Altura,
            Peso,
        } = req.body;

        // Crea un nuevo Pokémon en la base de datos
        const nuevoPokemon = await Pokemon.create({
            Nombre,
            Imagen,
            Vida,
            Ataque,
            Defensa,
            Velocidad,
            Altura,
            Peso,
        });

        // Asocia los tipos al nuevo Pokémon utilizando los IDs obtenidos
        await nuevoPokemon.addTipos(tipoIds);

        // Busca el Pokémon nuevamente para incluir los tipos asociados en la respuesta
        const pokemonConTipos = await Pokemon.findByPk(nuevoPokemon.ID, {
            include: Tipo,
        });

        if (!pokemonConTipos) {
            return res.status(500).send("Error al buscar el Pokémon recién creado");
        }

        // Mapea los tipos para incluir solo el nombre en la respuesta
        const tiposSimplificados = pokemonConTipos.Tipos.map((tipo) => tipo.Nombre);

        // Modifica la respuesta para incluir solo los nombres de los tipos
        const respuestaSimplificada = {
            ID: pokemonConTipos.ID,
            Nombre: pokemonConTipos.Nombre,
            Imagen: pokemonConTipos.Imagen,
            Vida: pokemonConTipos.Vida,
            Ataque: pokemonConTipos.Ataque,
            Defensa: pokemonConTipos.Defensa,
            Velocidad: pokemonConTipos.Velocidad,
            Altura: pokemonConTipos.Altura,
            Peso: pokemonConTipos.Peso,
            Tipos: tiposSimplificados,
        };
        console.log('tipos',pokemonConTipos)
        res.status(201).json(respuestaSimplificada);

    } catch (error) {
        console.error("Error al crear el Pokémon:", error);

        if (error.name === "SequelizeValidationError") {
            // Manejo de errores de validación de Sequelize
            return res.status(400).json({ error: "Error de validación. Verifique los datos proporcionados." });
        }

        res.status(500).send("Error interno del servidor al crear el Pokémon");
    }
});

module.exports = router;
