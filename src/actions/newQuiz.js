import { NEW_QUIZ } from '../assets/types';

export const newQuiz = () => async (dispatch) => {
  return (
    dispatch({type: NEW_QUIZ})
  );
}