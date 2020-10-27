import React, { FC } from 'react';

import { Pokemon as TPokemon } from '@store/pokemon/types';

import './pokemon.scss';

export const Pokemon: FC<TPokemon> = ({ name, url }) => {
  const id: string = url.split('pokemon/')[1].replace('/', '');

  return (
    <div className="pokemon">
      <div className="pokemon__pic">
        <img height="100px" width="100px" src={`https://pokeres.bastionbot.org/images/pokemon/${id}.png`} alt={name} />
      </div>
      <div className="pokemon__info">
        <div className="pokemon__info__name">name: {name}</div>
        <div className="pokemon__info__url">
          <a href={url}>URL</a>
        </div>
      </div>
    </div>
  );
};
