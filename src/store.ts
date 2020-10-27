import { applyMiddleware, createStore as rCreateStore, Store, Action, Reducer, Middleware } from 'redux';
import { composeWithDevTools } from 'redux-devtools-extension';
import thunk from 'redux-thunk';

export { combineReducers } from 'redux';

export const createStore = <S, A extends Action>(rootReducer: Reducer<S, A>, middlewares?: Middleware[]): Store<S, A> =>
  rCreateStore(rootReducer, composeWithDevTools(applyMiddleware(thunk, ...(middlewares || []))));
