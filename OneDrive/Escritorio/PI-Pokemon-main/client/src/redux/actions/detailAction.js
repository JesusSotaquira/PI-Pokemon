import axios from 'axios';

export const GET_DETAIL = 'GET_DETAIL';

export function detail(id) {
  return function(dispatch) {
    console.log(`Obteniendo detalles del Pokémon con ID ${id}...`); 
    axios.get(`http://localhost:3001/pokemons/${id}`)
      .then(response => {
        const pokemonDetail = {
          ...response.data,
          imagen: response.data.Imagen || response.data.imagen,
          id: response.data.ID,
          nombre: response.data.Nombre || response.data.nombre,
          vida: response.data.Vida || response.data.vida,
          ataque: response.data.Ataque || response.data.ataque,
          defensa: response.data.Defensa || response.data.defensa,
          velocidad: response.data.Velocidad || response.data.velocidad,
          altura: response.data.Altura || response.data.altura,
          peso: response.data.Peso || response.data.peso,
          tipos: response.data.Tipos || response.data.tipo,
        };
        console.log('Detalles del Pokémon obtenidos:', pokemonDetail); 
        
        dispatch({type: GET_DETAIL, payload: pokemonDetail});
      })
      .catch(error => {
        console.error('Error al obtener los detalles del Pokémon:', error.message); 
      });
  }
}
  
