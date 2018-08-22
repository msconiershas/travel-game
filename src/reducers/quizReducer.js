import defaults from '../assets/defaults'
import { START_QUIZ } from '../assets/types'
import fire from '../fire'

export default function quizReducer(state = defaults, action) {
	switch(action.type) {
		case START_QUIZ:
			const array = []
			console.log(action.payload.quizType)
			
			let newQuiz = Object.assign({}, state)
			

			newQuiz.currentRound++;
			newQuiz.quizType = action.payload.quizType;

			return state
		default:
			return state;
}
};

