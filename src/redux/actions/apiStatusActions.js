import { API_CALL_ERROR, BEGIN_API_CALL } from './actionTypes';

export const beginApiCall = () => ({ type: BEGIN_API_CALL });

export const apiCallError = (error) => ({ type: API_CALL_ERROR, error });
