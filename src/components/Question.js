import React, { Component } from 'react';
//import Gallery from './Components/GalleryComponent/Gallery'
import { fetchData } from '../actions/fetchData'
import { checkAnswer } from '../actions/checkAnswer'
import { fetchDataRequest } from '../actions/fetchPending'
import { connect } from 'react-redux'
import fire from '../fire'
import Answeroptions from './AnswerOptions'
import '../styles.css'
import { getName } from '../actions/getName'

class Question extends Component {
  constructor(props) {
    super(props);

    this.state = {img: '', updated : false , selectionMade: false};

    this.renderAnswers = this.renderAnswers.bind(this);
    this.handleAnswerSelection = this.handleAnswerSelection.bind(this);
    this.nextRound = this.nextRound.bind(this)
    this.ready = this.ready.bind(this)
  }

  componentDidMount() {
    console.log("quesiton page mounted")
    //this.props.getName()

  }
  randomNum(size) {
    return Math.floor( Math.random() * size );
  }
  

  renderAnswers() {
    if (this.props.chosenCountry && this.props.answerOptions) {
       const array = [];
    console.log(this.props.answerOptions) 
    }
  }
  ready() {
    if(this.props.updated) {
      return true
    }
    else return false
  }
  nextRound(e) {
    e.preventDefault()
    this.props.fetchData()
    if(this.state.selectionMade) {
      this.setState({ selectionMade: false});
      this.setState({udpated: true})
      
    }

  }
  handleAnswerSelection(item, index) {
    
    if (this.state.selectionMade) return;
    let newState = Object.assign({}, this.state);
    newState["selectionMade"] = true;
    newState["chosenIndex"] = index;
    
    this.setState(newState);
    let answer;
    item.name === this.props.chosenCountry.country
      ? (answer = true)
      : (answer = false);
    this.props.checkAnswer(answer);    
  }

  
  render() {
    
    return (
      <div className="main">
        <div>
          <div className="main_question">
              <h1 > What country is this?</h1>
              <div className="progress-bar-container">
              <div className="progress-bar" style={{ width: `${(this.props.currentRound*10)-10}%` }}/></div>
              <h3 className='score'> User Score {this.props.userScore}/10 </h3>
           </div>
          <div  className='start'>
            <div >
             
            </div>
            <img className="country_image" src={this.props.image} alt='image option'/>
            
          </div>
          {this.renderAnswers}
          <ul>
          {this.props.answerOptions.map(
          (item, index) => (
            <li className="country_options"
              onClick={() => this.handleAnswerSelection(item, index)}
              key={index}
              className={
                this.state.selectionMade &&
                item.name === this.props.chosenCountry.country
                  ? "green-bg"
                  : this.state.selectionMade &&
                    index === this.state.chosenIndex &&
                    item.name !== this.props.chosenCountry.country
                    ? "red-bg"
                    : !this.state.selectionMade 
                      ? "no-hover"
                      : ""
              }
            >
              {item.name}
            </li>
          )
        )}
        </ul>
        <button className="next_button" onClick={this.nextRound}> Next Round</button>
         </div>
         
      </div>
    )
 
}
}

const mapStateToProps = state => ({
  chosenCountry: state.answer.chosenCountry,
  answerOptions: state.answer.answerOptions,
  answerIndex: state.answer.answerIndex,
  userScore: state.answer.userScore,
  currentRound: state.answer.currentRound,
  image: state.answer.image
})

export default connect(mapStateToProps, 
    { fetchData, checkAnswer, getName }
  ) (Question);

