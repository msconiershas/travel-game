import React, { Component } from 'react';
import ReactDOM from 'react-dom'
import fire from './fire';
import countryArray from './assets/countryArray'
import './styles.css'
import { connect } from 'react-redux'
import RandomImage from './components/RandomImage'
import { Provider } from 'react-redux'
import { fetchData } from './actions/fetchData'
import { getName } from './actions/getName'

import Question from './components/Question'
import StartPage from './components/StartPage'


function getRandomNumber(min, max) {
  return Math.floor(Math.random() * (max + 1 - min) + min);
}

class App extends Component {
  
  constructor(props) {
    super(props);
    //this.state = { messages: [] }; // <- set up react state
    this.state = {matches: [], name: '', city: ''};


    this.formPreventDefault = this.formPreventDefault.bind(this);
    this.onClickPreventDefault = this.onClickPreventDefault.bind(this);
    this.getItems = this.getItems.bind(this)
    this.onSubmitForm = this.onSubmitForm.bind(this)
    this.onCityChange = this.onCityChange.bind(this)
    this.onNameChange = this.onNameChange.bind(this)
    this.clearFields = this.clearFields.bind(this)
    this.handlePage = this.handlePage.bind(this)
    this.handleClick = this.handleClick.bind(this)

  }
  
  // handler recieves the `e` event object
  formPreventDefault(e) {
    alert('here');  
    e.preventDefault();
  }
  
  onClickPreventDefault(e) {
    alert('onClickPreventDefault called, form will not submit');
    e.preventDefault();
  }
 
 random(min, max) {
    return Math.floor(Math.random() * (max - min + 1)) + min
 };
  componentWillMount(){
    
   
    this.getItems()
    if(this.props.currentRound === -1)
    this.props.fetchData();
    //this.props.getName()

    const count = fire.firestore().collection('countries')
    
    var i;
    var j;

    for(i = 0; i < countryArray.length; i++) {
      var imgs = [];
      var next = countryArray[i]
      var num = getRandomNumber(0, 10000)

      for(j = 0; j < next.images.length; j++) {
            imgs.push(next.images[j])
            
        }
        count.doc(next.country).set({
          random: num,
          country: next.country,
          continent: next.continent,
          id: next.id,
          source: next.source,
          unusedImages: imgs
          
        })
     
    }
  }

  onSubmitForm(e) {
    e.preventDefault();
    console.log(this.state)
    fire.firestore()
    .collection('cafes')
    .doc(this.state.name)
    .set({
        name: this.state.name,
        city: this.state.city
    })
    this.state.name = ''
    this.clearFields();
  } 

  handleDelete(index) {

    var matches = this.state.matches
    console.log(matches)
    var i = matches.splice(index, 1)
    var id = i[0].id
    
    fire.firestore()
    .collection('cafes')
    .doc(id).delete()
    
    
    this.setState({matches})
    console.log(this.state.matches)
  }

  onNameChange(e) {
    this.setState({[e.target.name]: e.target.value})
  }

  onCityChange(e) {
    this.setState({[e.target.name]: e.target.value})
  }

  clearFields() {
    this.setState({name: '', city: ''})
  }


  getItems() {
    const matches = [];
      fire.firestore().collection('cafes')
      .orderBy('city').onSnapshot(snapshot => {
        let changes = snapshot.docChanges();
        changes.forEach((change, index) => {
          if(change.type == 'added') {

            matches.push({
            name: change.doc.data().name,
            city: change.doc.data().city,
            id: change.doc.id
          })
          }
          
        })
        this.setState({matches})
      })

      }
  componentDidUpdate(prevProps) {
    console.log('component updated')
    console.log('user score..', this.props.userScore)
    if( (this.props.image !== prevProps.image)) // Check if it's a new user, you can also use some unique property, like the ID  (this.props.user.id !== prevProps.user.id)
    {
          console.log('hey')
           this.handlePage();
    }
}
  handlePage() {
    if(this.props.fetching === true) { return <h1> Loading...</h1>}
    else if(this.props.currentRound === 0) {
        return <StartPage />
    }
    else if(this.props.currentRound > 0) {
      console.log("question page")
      return <Question />
    }
    
    else {return <h1> Loading </h1>}
  }

  getInitialState() {
    return ({isClicked : false})    
  }

  handleClick() {
    this.setState({isClicked : !this.state.isClicked});
  }

  render() {
    var elementClass = this.state.isClicked ? 'rotated' : ''; 
    return (
      <div>
      <div className="content">
        
          
        <form   onSubmit={this.onSubmitForm.bind(this)}   id="add-cafe-form">
               <input type="text" value={this.state.name} name="name" placeholder="Cafe name" onChange={this.onNameChange}></input>
                <input type="text" value={this.state.city} name="city" placeholder="Cafe city" onChange={this.onCityChange}></input>
                <button>Add Cafe</button>
        </form>

         <ul id='cafe-list'>
                {this.state.matches.map((v,index) => {
          return (
            
             <li key={index} data-id={v.id}> <span> {v.name}</span> <span>{v.city}</span> <div onClick={this.handleDelete.bind(this, index)} >x</div> </li>
            
          );
        })}
        </ul>
        
      </div>
        {this.handlePage()}
        <div id="earth"></div>
        <div className={elementClass} onClick={this.handleClick} >some text</div>
      </div>
      
    );
  }
}

const mapStateToProps = state => ({
  chosenCountry: state.answer.chosenCountry,
  currentRound: state.answer.currentRound,
  answerOptions: state.answer.answerOptions,
  fetching: state.answer.fetching,
  userScore: state.answer.userScore,
  image: state.answer.image
})

export default connect(mapStateToProps, 
    { fetchData, getName }
  ) (App);