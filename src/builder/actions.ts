import { Action } from 'redux';
import { WorkerPayload, Axios } from './types';
import { getFormData } from '../helpers/form-data';

const commonWorker = (fn: Function) => {
  return (actionCreator: Action, url: string, method: string, { onSuccess, onFail }: any = {}) => (
    body: any = {},
    { cOnSuccess, cOnFail, formData }: any = {},
  ) => async (dispatch: Function, getState: Function) => {
    const onSuccessHook = onSuccess || cOnSuccess;
    const onFailHook = onFail || cOnFail;

    return fn({
      actionCreator,
      url,
      method,
      body,
      dispatch,
      getState,
      onSuccessHook,
      onFailHook,
      formData,
    });
  };
};

export const initWorker = (_axios: Axios) =>
  commonWorker(
    async <T, P, E>({
      dispatch,
      actionCreator,
      method,
      url,
      body,
      onSuccessHook,
      onFailHook,
      formData = false,
    }: WorkerPayload<T, P, E>) => {
      dispatch(actionCreator.started(body));
      try {
        const _body = formData ? getFormData(body) : body;

        const res = await _axios[method](`${process.env.API_URL}${url}`, _body);

        if (onSuccessHook) {
          await onSuccessHook({ dispatch });
        }

        dispatch(actionCreator.done(res?.data));
      } catch (error) {
        dispatch(actionCreator.failed(error?.response?.data));

        if (onFailHook) {
          await onFailHook(error);
        }
      }
    },
  );

export const eraseWorker = (actionCreator: any) => (fieldName: string, value: any) => (dispatch: Function) =>
  dispatch(actionCreator({ [fieldName]: value }));
