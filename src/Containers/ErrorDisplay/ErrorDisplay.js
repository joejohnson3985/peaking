import React, { Component } from 'react';
import { connect } from 'react-redux';
import './ErrorDisplay.scss';
import { setError } from '../../Actions';


class ErrorDisplay extends Component {

  showError = () => {
    if(this.props.error.length) {
      setTimeout(() => this.props.setError(''), 3500)
    }
  }

  render() {
    let whatToRender;
    if(this.props.error.length) {
      whatToRender = <p>{this.props.error}</p>
      this.showError()
    }
    return(
      <div className='show-error-bar'>
        {whatToRender}
      </div>
    ) 
  }
}

const mapStateToProps = state => ({
  error: state.error
})

const mapDispatchToProps = dispatch => ({
  setError: error => dispatch(setError(error))
})

export default connect(mapStateToProps, mapDispatchToProps)(ErrorDisplay)

