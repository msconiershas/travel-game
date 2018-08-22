import { START_QUIZ } from '../assets/types';
import fire from '../fire';



export function startQuiz(data) {
return (
		{
		type: START_QUIZ,
		payload: {
			quizType: data
		} 
	});
}