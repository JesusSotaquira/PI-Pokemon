

import { createStore, applyMiddleware } from 'redux';
import thunk from 'redux-thunk'; // Para manejar acciones asíncronas
import rootReducer from './reducers/pokemonReducer'; // Puedes crear tu propio rootReducer


const store = createStore(rootReducer, applyMiddleware(thunk));

export default store;
