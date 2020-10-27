import { AsyncActionCreators } from './action-types';

export interface Action {
  type: string;
  payload: any;
}

export interface DataMasks {
  loadingMask?: string;
  errorMask?: string;
  dataMask: string;
}

export interface Type {
  type: string;
}

export interface Axios {
  [key: string]: any;
}

export interface FormData {
  getAll(): string[];
}

export interface WorkerPayload<T, P, E> {
  dispatch: Function;
  actionCreator: AsyncActionCreators<T, P, E>;
  method: string;
  url: string;
  body: any;
  onSuccessHook: Function;
  onFailHook: Function;
  formData: boolean;
}
