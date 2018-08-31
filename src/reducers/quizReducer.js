import defaults from '../assets/defaults'
import { START_QUIZ, NEW_QUIZ } from '../assets/types'
import fire from '../fire'

export default function quizReducer(state = defaults, action) {
	switch(action.type) {
		case START_QUIZ:
			const array = []
			console.log(action.payload.quizType)
			
			let newQuiz = Object.assign({}, state)
			

			newQuiz.currentRound = 0;
			newQuiz.quizType = action.payload.quizType;

			return state
		case NEW_QUIZ:
	      let newQuizData = Object.assign({}, state);
	      newQuizData.currentRoundQuestions = [];
	      newQuizData.currentRoundAnswer = -1;
	      newQuizData.currentRound = 0;
	      newQuizData.userScore = 0;
	      return newQuizData;
		default:
			return state;
}
};

