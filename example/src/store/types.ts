import { PokemonState } from './pokemon/types';

export interface ErrorResponse {
  code: number;
  message: string;
}

export interface RootReducer {
  pokemons: PokemonState;
}
