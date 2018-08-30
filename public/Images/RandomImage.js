import React, {Component} from "react";
import PropTypes from 'prop-types';
import Shuffle from 'shuffle-array';
import './RandomImage.css';
//import './Heading.css';

function importAll(r) {
  let images = {};
  r.keys().map((item, index) => { images[item.replace('./', '')] = r(item); });
  return images;
}

class RandomImage extends Component {

	render() {
	const images = importAll(require('./', false, /\.(png|jpe?g|svg)$/));
	const keys = Object.keys(images);
	console.log(keys);
	const it = keys[Math.floor(Math.random()*keys.length)];
	const chosen = images[it];

    return (
      <div className="image">
		<img  src={chosen} alt=''/>
      	
      </div>
		);
	}
}

 RandomImage.propTypes = {
    folder: PropTypes.string.isRequired
  };

export default RandomImage;