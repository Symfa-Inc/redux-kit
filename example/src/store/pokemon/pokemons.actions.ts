import { actionCreatorFactory, initWorker, AsyncActionCreators } from '@wellyes/redux-kit';
import axios from '@utils/axios';

import { PokemonResponse } from './types';
import { ErrorResponse } from '../types';

const payloadedWorker = initWorker(axios);
const actionCreator = actionCreatorFactory('pokemons');

export const pokemons: AsyncActionCreators<object, PokemonResponse, ErrorResponse> = actionCreator.async<
  object,
  PokemonResponse,
  ErrorResponse
>('all');

export const pokemonsWorker = (limit: number, offset: number) =>
  payloadedWorker(pokemons, `pokemon?limit=${limit}&offset=${offset}`, 'get');
