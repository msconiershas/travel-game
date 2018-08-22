import { CHECK_ANSWER } from '../assets/types';

export function checkAnswer(userAnswer) {

	return {
		type: CHECK_ANSWER,
		payload: userAnswer
		
	}
}