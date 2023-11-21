import axios from 'axios';

export const GET_NAME = 'GET_NAME';

export function getName(name) {
  return function (dispatch, getState) {
    // Limpia el estado antes de realizar una nueva búsqueda
    dispatch({ type: 'CLEAR_POKEMON_DATA' });

    axios.get(`http://localhost:3001/pokemons/name?name=${name}`)
      .then(response => {
        const pokemonData = response.data;
        const allPokemons = getState().allPokemons;

        const filteredPokemons = allPokemons.filter(pokemon => pokemon.name.toLowerCase().includes(name.toLowerCase()));

        dispatch({
          type: GET_NAME,
          payload: pokemonData,
          filteredPokemons,
        });
      })
      .catch(error => {
        console.error('Error fetching POKEMON:', error.message);
        dispatch({
          type: GET_NAME,
          payload: null,
          filteredPokemons: getState().allPokemons,
        });
      });
  };
}

  
  
  