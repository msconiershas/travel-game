import { FETCH_PENDING } from '../assets/types';

export default function fetchDataRequest(dispatch){
  return async dispatch  => ({
    type: FETCH_PENDING

  })
}