# Redux-kit

[LIVE DEMO](https://aiscom-llc.github.io/redux-kit/)

## Installation

`yarn add @wellyes/redux-kit`

## Purpose
Library for reducing amount of redux code. Everything that you need is to call "builder" methods that will easly configure your app store.

## What's Included

* `actionCreatorFactory` - simply implements [typescript-fsa](https://github.com/aikoven/typescript-fsa). 

  ```ts
    import { actionCreatorFactory } from '@wellyes/redux-kit';

    const actionCreator = actionCreatorFactory('pokemons');
  ```

  returns builder which allows to create async and sync actions.

  ```ts
    const syncAction = actionCreator('sync');
    const asyncAction = actionCreator.async<
      object,
      PokemonResponse,
      ErrorResponse
    >('async');

    asyncAction.pending();
    asyncAction.done();
    asyncAction.failed();
  ```

* `initWorker` - wrapper around method that allows to create async action handlers. Accepts app `axios` instance and returns actionWorker factory, which allows to create action workers. 

  ```ts
    import { actionCreatorFactory, initWorker, AsyncActionCreators } from '@wellyes/redux-kit';

    import axios from '@utils/axios';

    const payloadedWorker = initWorker(axios);
    const actionCreator = actionCreatorFactory('pokemons');

    export const pokemons: AsyncActionCreators<object, PokemonResponse, ErrorResponse> = actionCreator.async<
      object,
      PokemonResponse,
      ErrorResponse
    >('all');

    export const pokemonsWorker = (limit: number, offset: number) =>
  payloadedWorker(pokemons, `pokemon?limit=${limit}&offset=${offset}`, 'get');
    
    //You component code
    //Simply use dispath from react-redux package
    dispatch(pokemonsWorker(filters.limit, filters.offset)());

    //Example with body
    dispatch(pokemonsWorker(filters.limit, filters.offset)({
      example: 'of_body',
    }));

    //Example with callbacks
       dispatch(pokemonsWorker(filters.limit, filters.offset)({
      example: 'of_body',
    }, {
      cOnFail: (err) => console.log('Error', err),
      cOnSuccess: (payload) => console.log(payload),
      //formData flag is ussed to send body as multipart/form-data
      //Library will automatically convert u'r object to formdata.
      //default value is false
      formData: true
    }));
  ```
* `eraseWorker` - method that generates handler to clear any field in store.
* `reducer` - method that generates default async reducer with action types:
  * `pending` - request started
  * `done` - request ended without errors
  * `failed` - request ended with errors

```ts
  import { Action, reducer } from '@wellyes/redux-kit';

  import { pokemons } from './pokemons.actions';

  export const pokemonsReducer = (state: PokemonState = initialState, action: Action): PokemonState => {
  const states = {
    ...reducer(pokemons, state, action, { dataMask: 'pokemons', loadingMask: 'loading', errorMask: 'errors' }),
  };
  return states[action.type] || state;
};
```

Basically `...reducer(ACTION_TYPE, STATE, CUR_ACTION, { SETTINGS })` generates object with keys `ACTION_NAME_PENDING`, `ACTION_NAME_DONE`, `ACTION_NAME_FAILED`.</br></br>
`SETTINGS` object contains of:</br>
1. `dataMask` - mask for your response(`asyncAction.done()`), will be updated with async action payload if async action ends without errors.
2. `loadingMask` - loading mask will automatically set to `true` after you async action will be emitted `asyncAction.pending()` and `false` after it will ends with error or not.
3. `errorMask` - errorMask will be seted with error payload(``asyncAction.failed(new Error())``) in case of any errors.

* `eraseReducer` - generates reducer for erasing any fields in store.
* `createStore` -  simply implements [redux](https://github.com/reduxjs/redux) `createStore` method.
* `combineReducers` -  simply implements [redux](https://github.com/reduxjs/redux) `combineReducers` method.

