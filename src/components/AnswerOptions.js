import React, { Component } from 'react';

function Answers(props) {
	const answerOptions = props.answerOptions;

if(answerOptions) {
return(
	<ul id='cafe-list'>
                {answerOptions.map((v,index) => {
          return (
            
             <li key={index} ><span> {v.name}</span>  </li>
            
          );
        })}
     </ul>
     );
}
else
	return ('');
}

export default Answers;
