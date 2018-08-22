import React, { Component } from 'react';
import { Link } from 'react-router';
import PropTypes from 'prop-types';

function shuffleArray(array) {
  let i = array.length - 1;
  for (; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    const temp = array[i];
    array[i] = array[j];
    array[j] = temp;
  }
  return array;
}

function RandomArray(props) {
  const shuffledCountries = shuffleArray(props.countries);
  console.log(shuffledCountries[0].country)
  const images = shuffleArray(shuffledCountries[0].images)
  const image = 
  console.log(images[0])
  return(
      <div>
         shuffledCountries
      </div>
    );
  
}
RandomArray.propTypes = {
  countries: PropTypes.array,
};
export default RandomArray;