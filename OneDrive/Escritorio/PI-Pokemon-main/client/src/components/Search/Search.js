import React, { useState } from 'react';
import { connect } from 'react-redux';
import { getName } from '../../redux/actions/Actions';
import { Link } from 'react-router-dom';

const Search = ({ getName, pokemonData }) => {
  const [query, setQuery] = useState('');

  const handleInputChange = (event) => {
    setQuery(event.target.value);
  };

  const handleSearch = () => {
    if (query.trim() !== '') {
      getName(query);
      setQuery('');
    }
  };

  return (
    <div>
      <input type="text" value={query} onChange={handleInputChange} />
      <button onClick={handleSearch}>Buscar</button>
      {pokemonData && (
        <div>
          {Array.isArray(pokemonData) ? (
            // Renderizado para Pokémon creados en la base de datos
            pokemonData.map((pokemon, index) => (
              <div key={index}>
                <Link to={`/pokemons/${pokemon.id}`}>
                  <img
                    src={pokemon.imagen || 'https://i.ytimg.com/vi/7jC-LP5qiC8/maxresdefault.jpg'}
                    alt={pokemon.nombre}
                  />
                </Link>
                <p>Nombre del Pokémon: {pokemon.nombre}</p>
                <p>Tipos: {pokemon.tipo}</p>
              </div>
            ))
          ) : (
            // Renderizado para Pokémon de la API
            <div>
              <Link to={`/pokemons/${pokemonData.id}`}>
                <img
                  src={pokemonData.imagen || 'https://i.ytimg.com/vi/7jC-LP5qiC8/maxresdefault.jpg'}
                  alt={pokemonData.nombre}
                />
              </Link>
              <p>Nombre del Pokémon: {pokemonData.nombre}</p>
              <p>Tipos: {pokemonData.tipo}</p>
            </div>
          )}
        </div>
      )}
    </div>
  );
};

const mapStateToProps = (state) => ({
  pokemonData: state.pokemonData,
});

export default connect(mapStateToProps, { getName })(Search);
