export interface Pokemon {
  name: string;
  url: string;
}

export interface PokemonResponse {
  count: number;
  next: string;
  previous: string;
  results: Pokemon[];
}

export interface PokemonState {
  pokemons: PokemonResponse;
  loading: boolean;
  errors: string;
}
