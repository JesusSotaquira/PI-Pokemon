import axios from 'axios';

export const GET_POKEMON = 'GET_POKEMON';

export function getPokemon(pagina) {
  const offset = (pagina - 1) * 12;
  const limit = 12;

  return function(dispatch) {
    axios.get(`http://localhost:3001/pokemons?offset=${offset}&limit=${limit}`)
      .then(response => {
        const pokemonArray = response.data;
        console.log('array', pokemonArray)
        dispatch({ type: GET_POKEMON, payload: pokemonArray });
      })
      .catch(error => {
        console.error('Error fetching POKEMON:', error.message);
      });
  };
}
