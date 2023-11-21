import { GET_POKEMON } from '../actions/pokemonActions';
import { GET_NAME} from '../actions/Actions'
import { GET_DETAIL } from '../actions/detailAction';
import { CREATE_POKEMON } from '../actions/ActionCreate';

const initialState = {
  allPokemons: [],  // Lista completa de pokémons
  pokemons: [],     // Lista filtrada (por búsqueda, inicialmente igual a la lista completa)
  pokemonDetails: null,
  pokemonData: null,
  error: null,
};

export default function rootReducer(state = initialState, action) {
  switch (action.type) {
    case GET_POKEMON:
      return {
        ...state,
        allPokemons: action.payload,
        pokemons: action.payload,
      };
    case GET_NAME:
      console.log('Datos acción:', action.payload);
      return {
        ...state,
        pokemonData: action.payload,
        pokemons: action.filteredPokemons,  // Actualiza la lista filtrada
        error: null,
      };
    case GET_DETAIL:
      return {
        ...state,
        pokemonDetail: action.payload,  // Actualiza los detalles del Pokémon
      };
      case CREATE_POKEMON:
      console.log('Nuevo Pokémon creado:', action.payload);
      // Actualiza la lista de todos los pokémons y la lista filtrada
      return {
        ...state,
        allPokemons: [...state.allPokemons, action.payload],
        pokemons: [...state.pokemons, action.payload],
      };
      
    case 'CLEAR_POKEMON_DATA':
      return {
        ...state,
        pokemonData: null,
      };
      
    default:
      return state;
  }
}
