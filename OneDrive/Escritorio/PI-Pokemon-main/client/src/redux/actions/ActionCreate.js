import axios from 'axios';


export const CREATE_POKEMON = 'CREATE_POKEMON';


export function createPokemon(pokemonData) {
  return async dispatch => {
    try {
    
      const response = await axios.post('http://localhost:3001/crear', pokemonData);
      dispatch({
        type: CREATE_POKEMON,
        payload: response.data,
      });
    } catch (error) {
      console.error("Error al crear el Pokémon:", error);
    }
  };
}
