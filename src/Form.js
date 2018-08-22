import React, { Component } from 'react'


class Form extends Component {

	handleClick(e) {

	}
	render() {
	return (
		<div>
			<form  id="cafe-list" className="content"  id="add-cafe-form">
                <input type="text" name="name" placeholder="Cafe name"></input>
                <input type="text" name="city" placeholder="Cafe city"></input>
                <button>Add Cafe</button>
        </form>
		</div>
)
}
}

export default Form;