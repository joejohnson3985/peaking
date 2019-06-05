import { ErrorDisplay, mapStateToProps, mapDispatchToProps } from './ErrorDisplay';
import { shallow } from 'enzyme';
import React from 'react';
import { setError } from '../../Actions';

describe('ErrorDisplay', () => {
  let wrapper;
  let error;
  describe('Component', () => {
    it('Should match the snapshot when there is no error.', () => {
      error = ''
      wrapper = shallow(
        <ErrorDisplay
          error={error}
        />
      )
      expect(wrapper).toMatchSnapshot()
    })

    it('Should match the snapshot when there is an error.', () => {
      error = 'error'
      wrapper = shallow(
        <ErrorDisplay
          error={error}
        />
      )
      expect(wrapper).toMatchSnapshot()
    })

    it('Should clear the error message', () => {
      error = 'error'
      wrapper = shallow(
        <ErrorDisplay
          error={error}
        />
      )
      expect(wrapper.props.error).toEqual(undefined)
    })
  })
})