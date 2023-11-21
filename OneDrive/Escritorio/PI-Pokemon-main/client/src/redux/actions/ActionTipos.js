import axios from 'axios';

export const GET_POKEMON_TYPES = 'GET_POKEMON_TYPES';

export const getPokemonTypes = () => async (dispatch) => {
  try {
    const response = await axios.get('http://localhost:3001/types'); 
    dispatch({
      type: GET_POKEMON_TYPES,
      payload: response.data,
    });
  } catch (error) {
    console.error("Error al obtener los tipos de Pokémon:", error);
  }
};
