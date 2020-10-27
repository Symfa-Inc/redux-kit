import React, { FC, useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import { pokemonsWorker } from '@store/pokemon/pokemons.actions';
import { getPokemons } from '@store/pokemon/pokemons.selectors';
import { Pokemon as TPokemon } from '@store/pokemon/types';

import { Pokemon } from './pokemon';
import { Filters } from './types';

import './pokemons.scss';

export const PokemonsPage: FC = () => {
  const dispatch = useDispatch();

  const [filters, setFilters] = useState<Filters>({
    limit: 21,
    offset: 0,
  });

  const { pokemons, loading } = useSelector(getPokemons);

  useEffect(() => {
    dispatch(pokemonsWorker(filters.limit, filters.offset)());
  }, [dispatch, filters]);

  return (
    <div className="page">
      <div className="page__header">
        <h2>Pokemons</h2>
      </div>
      <div className="page__body">
        {loading && <div>Loading...</div>}
        {pokemons?.results.map((p: TPokemon) => (
          <Pokemon key={p.url} {...p} />
        ))}
      </div>
      <div className="page__footer">
        <input
          type="number"
          value={filters.limit}
          onChange={e => setFilters({ offset: 0, limit: Number(e.target.value) })}
        />
        <div>
          <button
            onClick={() => setFilters({ ...filters, offset: filters.offset - filters.limit })}
            disabled={!pokemons.previous}
          >
            prev page
          </button>
          <button
            onClick={() => setFilters({ ...filters, offset: filters.offset + filters.limit })}
            disabled={!pokemons.next}
          >
            next page
          </button>
        </div>
      </div>
    </div>
  );
};
