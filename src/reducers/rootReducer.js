import { combineReducers } from 'redux';
import answerReducer from './answerReducer';
import quizReducer from './quizReducer';

export default combineReducers({
	answer: answerReducer,
	quiz: quizReducer
});