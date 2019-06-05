import React, { Component } from 'react';
import { connect } from 'react-redux';
import './ErrorDisplay.scss';
import { setError } from '../../Actions';


export class ErrorDisplay extends Component {

  clearError = () => {
    let cleared = ''
    setTimeout(() => this.props.setError(cleared), 3500)
  }

  render() {
    let whatToRender;
    if(this.props.error.length) {
      whatToRender = <p>{this.props.error}</p>
      this.clearError()
    }
    return(
      <div className='show-error-bar'>
        {whatToRender}
      </div>
    ) 
  }
}

export const mapStateToProps = state => ({
  error: state.error
})

export const mapDispatchToProps = dispatch => ({
  setError: error => dispatch(setError(error))
})

export default connect(mapStateToProps, mapDispatchToProps)(ErrorDisplay)