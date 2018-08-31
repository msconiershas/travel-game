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

		<div className="start_page">
			<h1 className="title"> Welcome  </h1>
			<div className="banner">
				<img src={MapImage} alt='' />
			</div>
			<div >
			<button className="start_page_button" onClick={this.startQuiz} > Start </button>
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
