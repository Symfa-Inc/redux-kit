import { combineReducers } from '@wellyes/redux-kit';
import { pokemonsReducer } from './pokemon/pokemons.reducer';

export const rootReducer = combineReducers({
  pokemons: pokemonsReducer,
});
