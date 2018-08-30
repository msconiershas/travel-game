import React, { Component } from 'react';
//import Gallery from './Components/GalleryComponent/Gallery'
import { fetchData } from '../actions/fetchData'
import { checkAnswer } from '../actions/checkAnswser'
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
    this.props.fetchData()
    if(this.state.selectionMade) {
      this.setState({ selectionMade: false});
      //this.props.fetchData()
      //this.props.getName()
      this.setState({udpated: true})
      
    }
    console.log(this.props.image)

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
    console.log(answer)
    this.props.checkAnswer(answer);
    //this.props.fetchData()
    
  }

  
  render() {
    
    return (
      <div>
        <div>
         <h1> What country is this?</h1>
         <h3> User Score {this.props.userScore} </h3>
          <div  className='start'>
            <div >
             
            </div>
            <img src={this.props.image} alt=''/>
            
          </div>
          {this.renderAnswers}
          {this.props.answerOptions.map(
          (item, index) => (
            <h4
              onClick={() => this.handleAnswerSelection(item, index)}
              key={index}
              className={
                this.state.selectionMade &&
                item.name === this.props.chosenCountry.country
                  ? "green-bg"
                  : this.state.selectionMade &&
                    
                    index === this.state.chosenIndex
                    ? "red-bg"
                    : this.state.selectionMade &&
                      index !== this.state.answerIndex
                      ? "no-hover"
                      : ""
              }
            >
              {item.name}
            </h4>
          )
        )}
        <button onClick={this.nextRound}> Next Round</button>
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
  image: state.answer.image
})

export default connect(mapStateToProps, 
    { fetchData, checkAnswer, getName }
  ) (Question);

