import { Action, reducer } from '@wellyes/redux-kit';
import { PokemonState } from './types';
import { pokemons } from './pokemons.actions';

const initialState: PokemonState = {
  pokemons: {
    next: '',
    previous: '',
    count: 0,
    results: [],
  },
  loading: false,
  errors: '',
};

export const pokemonsReducer = (state: PokemonState = initialState, action: Action): PokemonState => {
  const states = {
    ...reducer(pokemons, state, action, { dataMask: 'pokemons', loadingMask: 'loading', errorMask: 'errors' }),
  };
  return states[action.type] || state;
};
