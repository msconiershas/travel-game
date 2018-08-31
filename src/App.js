import React, { Component } from 'react';
import ReactDOM from 'react-dom'
import fire from './fire';
import countryArray from './assets/countryArray'
import './styles.css'
import { connect } from 'react-redux'
import { Provider } from 'react-redux'
import { fetchData } from './actions/fetchData'
import Question from './components/Question'
import StartPage from './components/StartPage'


function getRandomNumber(min, max) {
  return Math.floor(Math.random() * (max + 1 - min) + min);
}

class App extends Component {
  
  constructor(props) {
    super(props);
    //this.state = { messages: [] }; // <- set up react state
    this.state = {matches: [], country: '', city: ''};


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
  
  formPreventDefault(e) {
    alert('here');  
    e.preventDefault();
  }
  
  onClickPreventDefault(e) {
    alert('onClickPreventDefault called, form will not submit');
    e.preventDefault();
  }

  componentWillMount() {
    
    this.getItems()
    if(this.props.currentRound === -1)
        this.props.fetchData();

    const count = fire.collection('countries')
    
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
    
    fire
    .collection('cafes')
    .doc(this.state.country)
    .set({
        country: this.state.country,
        city: this.state.city
    })
    this.state.country = ''
    this.clearFields();
  } 

  handleDelete(index) {

    var matches = this.state.matches
    console.log(matches)
    var i = matches.splice(index, 1)
    var id = i[0].id
    
    fire
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
    this.setState({country: '', city: ''})
  }

  getItems() {
    const matches = [];
      fire.collection('cafes')
      .orderBy('city').onSnapshot(snapshot => {
        let changes = snapshot.docChanges();
        changes.forEach((change, index) => {
          if(change.type == 'added') {

            matches.push({
            country: change.doc.data().country,
            city: change.doc.data().city,
            id: change.doc.id
          })
          }  
        })
        this.setState({matches})
      })
    }

  componentDidUpdate(prevProps) {
    console.log('user score..', this.props.userScore)
    if( this.props.image !== prevProps.image) {
           this.handlePage();
    }
  }

  handlePage() {
    if(this.props.fetching === true) { return <h1> Loading...</h1>}
    else if(this.props.currentRound === 0) {
        return <StartPage />
    }
    else if(this.props.currentRound > 0) {
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
    return (
      <div>
        {this.handlePage()}

        <div className="content">
        <form   onSubmit={this.onSubmitForm.bind(this)}   id="add-cafe-form">
               <input type="text" value={this.state.country} name="country" placeholder="Country" onChange={this.onNameChange}></input>
                <input type="text" value={this.state.city} name="city" placeholder="City" onChange={this.onCityChange}></input>
                <button>Add Country</button>
        </form>

         <ul id='cafe-list'>
                {this.state.matches.map((v,index) => {
          return (
             <li key={index} data-id={v.id}> <span> {v.country}</span> <span>{v.city}</span> <div onClick={this.handleDelete.bind(this, index)} >x</div> </li>
          );
        })}
        </ul>
        
      </div>
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
    { fetchData }
  ) (App);