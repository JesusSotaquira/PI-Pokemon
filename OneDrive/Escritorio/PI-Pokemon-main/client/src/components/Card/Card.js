import React, { useEffect, useState } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import { getPokemon } from '../../redux/actions/pokemonActions';

const Card = ({ pokemons, getPokemon, pokemonData }) => {
  const [pagina, setPagina] = useState(1);
  const [orden, setOrden] = useState(null);
  const [origen, setOrigen] = useState(null);
  const [ordenAtaque, setOrdenAtaque] = useState(null);
  const [tipo, setTipo] = useState([]); 

  useEffect(() => {
    getPokemon(pagina);
  }, [getPokemon, pagina, orden, origen, ordenAtaque, tipo]); 

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

  const handleSortAttack = (event) => { 
    setOrdenAtaque(event.target.value);
  };

  const handleFilter = (event) => {
    setOrigen(event.target.value);
    setPagina(1);//aca
  };

  const handleTypeFilter = (event) => { 
    const value = Array.from(event.target.selectedOptions, option => option.value);
    setTipo(value);
  };

  let pokemonsOrdenados = [...pokemons];

  if (orden) {
    pokemonsOrdenados.sort((a, b) => {
      if (orden === 'asc') {
        return a.name.localeCompare(b.name);
      } else if (orden === 'desc') {
        return b.name.localeCompare(a.name);
      } else {
        return 0;
      }
    });
  }
  if (ordenAtaque) {
    pokemonsOrdenados.sort((a, b) => {
      if (ordenAtaque === 'asc') {
        return a.attack - b.attack;
      } else if (ordenAtaque === 'desc') {
        return b.attack - a.attack;
      } else {
        return 0;
      }
    });
  }
  const pokemonsFiltrados = pokemonsOrdenados.filter((pokemon) => {
    if (origen === 'api') {
      return String(pokemon.id).length < 10; 
    } else if (origen === 'db') {
      return String(pokemon.id).length >= 10; 
    } else {
      return true;
    }
  }).filter((pokemon) => {
    if (tipo.length > 0) {
      return tipo.every(val => pokemon.type.includes(val));
    } else {
      return true;
    }
  });
  const pokemonsPorPagina = 12;
  
  const pokemonsPaginados = pokemonsFiltrados.slice((pagina - 1) * pokemonsPorPagina, pagina * pokemonsPorPagina);
  console.log('paginado',pokemonsPaginados)
  
  console.log('data',pokemonData)
  return (
    <div>
      <select onChange={handleSort}>
        <option value="">Ordenar por nombre</option>
        <option value="asc">De la A a la Z</option>
        <option value="desc">De la Z a la A</option>
      </select>

      <select onChange={handleSortAttack}> 
        <option value="">Ordenar por ataque</option>
        <option value="asc">De menor a mayor</option>
        <option value="desc">De mayor a menor</option>
      </select>

      <select onChange={handleFilter}>
        <option value="">Filtrar por origen</option>
        <option value="api">API</option>
        <option value="db">Base de datos</option>
      </select>

      <select multiple onChange={handleTypeFilter}> 
        <option value="fire">Fuego</option>
        <option value="water">Agua</option>
        <option value="grass">Hierba</option>
        <option value="electric">Eléctrico</option>
        <option value="psychic">Psíquico</option>
        <option value="ice">Hielo</option>
        <option value="dragon">Dragón</option>
        <option value="dark">Oscuro</option>
        <option value="fairy">Hada</option>
        <option value="normal">Normal</option>
        <option value="fighting">Lucha</option>
        <option value="flying">Volador</option>
        <option value="poison">Veneno</option>
        <option value="ground">Tierra</option>
        <option value="rock">Roca</option>
        <option value="bug">Bicho</option>
        <option value="ghost">Fantasma</option>
        <option value="steel">Acero</option>
        <option value="unknown">Desconocido</option>
        <option value="shadow">Sombra</option>
      </select>

      {pokemonsPaginados.map((pokemon, index) => {
        console.log('pokes',pokemon)
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
                <p>Tipos: {pokemon.type.join(', ')}</p>
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
