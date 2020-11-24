import { AsyncActionCreators } from './action-types';
import { Action, DataMasks, Reducer, ReducerValue } from './types';

export const eraseReducer = (actionCreator: any, state: any, action: Action) => ({
  [actionCreator.type]: {
    ...state,
    ...action.payload,
  },
});

/**
 * @param {object} actionCreator
 * @param {object} state prevState
 * @param {object} action
 * @param {object} masks custom object names
 */
export const reducer = <T, Param, Payload, Error>(
  actionCreator: AsyncActionCreators<Param, Payload, Error>,
  state: T,
  action: Action,
  masks?: DataMasks,
): Reducer<T, Param> => {
  const { loadingMask = 'isLoading', errorMask = 'errors', dataMask } = masks || {};
  return {
    [actionCreator.started.type]: (): ReducerValue<T, Param> => ({
      ...state,
      [loadingMask]: true,
      [errorMask]: false,
    }),
    [actionCreator.done.type]: (): ReducerValue<T, Param> => ({
      ...state,
      ...(dataMask ? { [dataMask]: action.payload } : {}),
      [loadingMask]: false,
      [errorMask]: false,
    }),
    [actionCreator.failed.type]: (): ReducerValue<T, Param> => ({
      ...state,
      [errorMask]: action.payload,
      [loadingMask]: false,
    }),
  };
};
