import React, { Component } from 'react';
import './Filter.scss'

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
      <div className='filter'>
        <input name='search' value={this.state.search } onChange={this.handleChange} type='text'/>
        <button>Search</button>
      </div>
    )
  }
}

export default Filter;