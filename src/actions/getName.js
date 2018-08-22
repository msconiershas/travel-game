import {handleActions} from 'redux-actions';
import { FETCH_PENDING, FETCH_SUCCESS, FETCH_FAILURE } from '../assets/types';
// firestore
import fire from '../fire'

function getRandomNumber(min, max) {
  return Math.floor(Math.random() * (max + 1 - min) + min);
}

// action creator
export const getName = () => async (dispatch) => {
  dispatch({type: FETCH_PENDING});
  try {

      const answerOptions = []
      let chosenCountry = {chosenCountry: {}}
      const array = []

      const ref = await fire.firestore().collection('countries');

      var min = 0
      var max = 100000
      const random = 
        Math.floor(Math.random() * (max - min + 1)) + min;
        console.log(random)
  
      ref.orderBy("random")
            .get()
            .then(snapshots => {
               snapshots.forEach(snapshot => {
                  answerOptions.push({
                    name: snapshot.data().country
                  }
                  
                  )
                })
             })

    console.log(answerOptions)

    ref.where("random", '>', random)
           .orderBy("random")
           .limit(1).get()
           .then(snapshot => {

              if(snapshot.empty) {
                  console.log('no doc found')
                  ref.where('random', '<=', random)
                  .orderBy('random')
                  .limit(1).get()
                  .then(snap => {
                      console.log(snap.docs[0])
                      chosenCountry.chosenCountry = snap.docs[0].data()
                      console.log(chosenCountry.chosenCountry.country)

                      dispatch({type: FETCH_SUCCESS, payload:
                               {chosenCountry: chosenCountry,
                               answerOptions: answerOptions
                                }
                              });

                  })
                }
            else {
               chosenCountry.chosenCountry = snapshot.docs[0].data() 
                console.log(chosenCountry.chosenCountry.country)
                
                dispatch({type: FETCH_SUCCESS, payload:
     {chosenCountry: chosenCountry,
      answerOptions: answerOptions
    }
    });
               }           
             })
        



   

    

    return {
      chosenCountry: chosenCountry,
      answerOptions: answerOptions
    };
  } catch (e) {
      console.log(e);
      dispatch({type: FETCH_FAILURE, payload: e});
  }
}

