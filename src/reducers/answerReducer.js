import { FETCH_PENDING, FETCH_SUCCESS, FETCH_FAILURE, FETCH_DATA, START_QUIZ, CHECK_ANSWER } from '../assets/types'
import defaults from '../assets/defaults'
import fire from '../fire'
import {handleActions} from 'redux-actions';

function getRandomNumber(min, max) {
  return Math.floor(Math.random() * (max + 1 - min) + min);
}
const initialState = {
  fetching: false,
  error: false,
  name: []
};

// Reducer
//export default 

export default function(state = defaults, action) {

	switch(action.type) {
		case FETCH_PENDING:
			return {
				...state,
				fetching: true,
				error: false
			}
		case FETCH_SUCCESS:
			return {
				...state, 
				fetching: false, 
				chosenCountry: action.payload.chosenCountry.chosenCountry,
				answerOptions: action.payload.answerOptions
			}
		case FETCH_FAILURE:
			return {
				...state,
				fetching: false,
				 error: true
			}
		case FETCH_DATA:

			let newState = Object.assign({}, state);
			const array = []
			console.log(action.payload.source)

			newState.chosenCountry = action.payload.chosenCountry;
			newState.answerOptions = action.payload.answerOptions;
			newState.image = action.payload.source;
			newState.currentRound++;
			newState.fetching = false

      		console.log('done')
      		return newState
        


		case START_QUIZ:

			console.log(action.payload.quizType)
			
			let newQuiz = Object.assign({}, state)
			
			newQuiz.answerIndex = getRandomNumber(0, 3);

			newQuiz.currentRound++;
			newQuiz.quizType = action.payload.quizType;
			console.log(newQuiz.currentRound)


			return newQuiz
		case CHECK_ANSWER:
	      let answeredQuestion = Object.assign({}, state);
	      if (action.payload) answeredQuestion.userScore++;
	      return answeredQuestion;
		default:
			return state;
	}
};

