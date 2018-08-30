import { FETCH_DATA, FETCH_PENDING } from '../assets/types';
import fire from '../fire';


export const fetchData = () => async (dispatch) => {
  dispatch({type: FETCH_PENDING});

  const state = {}
	const answerOptions = []
	const ref = fire
	.firestore()
	.collection('countries');

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
                        state.chosenCountry = snap.docs[0].data()
                   		dispatch( {
							type: FETCH_DATA,
							payload: {
								chosenCountry: snap.docs[0].data(),
								answerOptions: answerOptions
							} 
					    })
                   	})
                   		}
                 else
                   dispatch( {
					type: FETCH_DATA,
					payload: {
							chosenCountry: snapshot.docs[0].data(),
							answerOptions: answerOptions
							} 
							
					})
             }
     		)
	}
