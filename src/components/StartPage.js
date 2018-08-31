import React, { Component } from 'react';
//import Gallery from './Components/GalleryComponent/Gallery'
import { fetchData } from '../actions/fetchData'
import { connect } from 'react-redux'
import fire from '../fire'
import Answeroptions from './AnswerOptions'
import MapImage from '../world_map_image.png'
import '../styles.css'
import { startQuiz } from '../actions/startQuiz'

class StartPage extends Component {
	constructor(props) {
		super(props)

		this.startQuiz = this.startQuiz.bind(this)
	}

	startQuiz() {
		this.props.startQuiz("guess");
	}
	render() {
	return ( 

		<div>
			<h1> Welcome  </h1>
			<img id="banner" src={MapImage} alt='' />
			<div>
			<button onClick={this.startQuiz} > Start </button>
			</div>
		</div>
		

		) 
	}
};

const mapStateToProps = state => ({
  chosenCountry: state.answer.chosenCountry,
  currentRound: state.answer.currentRound,
  answerOptions: state.answer.answerOptions,
  type: state.quiz.type
})

export default connect(mapStateToProps, 
    { startQuiz }
  ) (StartPage);
