import React, { Component } from 'react';

class Filter extends Component {
  constructor() {
    super()
    this.state = {
      search:''
    }
  }

  handleChange = (e) => {
    const { name, value } = e.target
    this.setState({
      [name]: value
    })
  }

  render() {
    return(
      <div>
        <input name='search' value={this.state.search } onChange={this.handleChange} type='text'/>
      </div>
    )
  }
}

export default Filter;