import { createSelector } from 'reselect';
import { RootReducer } from '@store/types';

export const getPokemonsState = (state: RootReducer) => state.pokemons;

export const getPokemons = createSelector(getPokemonsState, ({ loading, errors, pokemons }) => ({
  loading,
  errors,
  pokemons,
}));
