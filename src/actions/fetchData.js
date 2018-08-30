import { FETCH_DATA, FETCH_PENDING } from '../assets/types';
import fire from '../fire';

function getRandomNumber(min, max) {
  return Math.floor(Math.random() * (max + 1 - min) + min);
}

export const fetchData = () => async (dispatch) => {
  dispatch({type: FETCH_PENDING});

  const state = {}
	const answerOptions = []
  let source = ''

	const ref = fire.collection('countries');

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
                      
                            const array = []
                            console.log(snap.docs[0].data().country)
                          
                           ref
                          .doc(snap.docs[0].data().country).get()
                          .then(snapsh => {
                               array.push({
                              imgs: snapsh.data().unusedImages
                              })

                              const t = getRandomNumber(0, array[0].imgs.length - 1)
                              const image = array[0].imgs[t]

                              source = snap.docs[0].data().source
                                + image
                              console.log(source)
                          

                            dispatch({
                							type: FETCH_DATA,
                							payload: {
                								chosenCountry: snap.docs[0].data(),
                								answerOptions: answerOptions,
                                source: source
                							} 
                					  })
                          })
                         	})
                    }
                    else {

                      const array = []
                      console.log(snapshot.docs[0].data().country)
                          
                           ref
                          .doc(snapshot.docs[0].data().country).get()
                          .then(snapsh => {
                               array.push({
                              imgs: snapsh.data().unusedImages
                              })

                              const t = getRandomNumber(0, array[0].imgs.length - 1)
                              const image = array[0].imgs[t]

                              source = snapshot.docs[0].data().source
                                + image
                              console.log(source)
                          

                            dispatch({
                              type: FETCH_DATA,
                              payload: {
                                chosenCountry: snapshot.docs[0].data(),
                                answerOptions: answerOptions,
                                source: source
                              } 
                            })
                          })
                      }
                 })
	}
