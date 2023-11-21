import React, { useEffect, useState } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import { getPokemon } from '../../redux/actions/pokemonActions';

const Card = ({ pokemons, getPokemon, pokemonData }) => {
  const [pagina, setPagina] = useState(1);
  const [orden, setOrden] = useState(null);
  const [origen, setOrigen] = useState(null);
  

  useEffect(() => {
    getPokemon(pagina);
  }, [getPokemon, pagina, orden, origen]);

  const handleNextPage = () => {
    setPagina(pagina + 1);
  };

  const handlePreviousPage = () => {
    if (pagina > 1) {
      setPagina(pagina - 1);
    }
  };

  const handleSort = (event) => {
    setOrden(event.target.value);
  };

  const handleFilter = (event) => {
    setOrigen(event.target.value);
  };

  const pokemonsOrdenados = [...pokemons].sort((a, b) => {
    if (orden === 'asc') {
      return a.name.localeCompare(b.name);
    } else if (orden === 'desc') {
      return b.name.localeCompare(a.name);
    } else {
      return 0;
    }
  });

  const pokemonsFiltrados = pokemonsOrdenados.filter((pokemon) => {
    if (origen === 'api') {
      return String(pokemon.id).length < 10; // Ajusta este número según la longitud de los ID de la API
    } else if (origen === 'db') {
      return String(pokemon.id).length >= 10; // Ajusta este número según la longitud de los ID de la base de datos
    } else {
      return true;
    }
  });

  return (
    <div>
      <select onChange={handleSort}>
        <option value="">Ordenar</option>
        <option value="asc">De la A a la Z</option>
        <option value="desc">De la Z a la A</option>
      </select>

      <select onChange={handleFilter}>
        <option value="">Filtrar por origen</option>
        <option value="api">API</option>
        <option value="db">Base de datos</option>
      </select>

      {pokemonsFiltrados.map((pokemon, index) => {
        if (pokemonData && pokemonData.name === pokemon.name) {
          return null;
        }

        return (
          <div key={index}>
            {pokemon.image && (
              <div>
                <Link to={`/pokemons/${pokemon.id}`}>
                  <img src={pokemon.image} alt={pokemon.name} />
                </Link>
              </div>
            )}
      
            {pokemon.name ? <p>Nombre del Pokémon: {pokemon.name}</p> : <p>No se encontró el nombre del Pokémon</p>}
      
            {pokemon.type && (
              <div>
                <p>Tipos: {pokemon.type}</p>
              </div>
            )}
          </div>
        );
      })}
      {pagina > 1 && <button onClick={handlePreviousPage}>Página anterior</button>}
      {!pokemonData && <button onClick={handleNextPage}>Siguiente página</button>}
    </div>
  );
};

const mapStateToProps = (state) => ({
  pokemons: state.pokemons,
  pokemonData: state.pokemonData,
});

export default connect(mapStateToProps, { getPokemon })(Card);
