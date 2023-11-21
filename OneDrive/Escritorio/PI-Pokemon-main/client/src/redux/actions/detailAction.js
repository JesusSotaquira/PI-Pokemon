import axios from 'axios';

export const GET_DETAIL = 'GET_DETAIL';

export function detail(id) {
    return function(dispatch) {
      console.log(`Obteniendo detalles del Pokémon con ID ${id}...`); 
      axios.get(`http://localhost:3001/pokemons/${id}`)
        .then(response => {
          const pokemonDetail = response.data;
          console.log('Detalles del Pokémon obtenidos:', pokemonDetail); 
          
          dispatch({type: GET_DETAIL, payload: pokemonDetail});
        })
        .catch(error => {
          console.error('Error al obtener los detalles del Pokémon:', error.message); 
        });
    }
  }
  
