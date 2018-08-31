import { START_QUIZ } from '../assets/types';

export function startQuiz(data) {
return (
		{
		type: START_QUIZ,
		payload: {
			quizType: data
		} 
	});
}