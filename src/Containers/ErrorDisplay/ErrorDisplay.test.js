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

  describe('mapStateToProps', () => {
    it('Should have a mapped state prop', () => {
      let mockState = {trails: [], isLoading: false, error: ''}
      let expected = {error: ''}
      const result = mapStateToProps(mockState)
      expect(result).toEqual(expected)
    })
  })

  describe('mapDispatchToProps', () => {
    it('Should call setError with correct params', () => {
      error = 'Test error'
      const mockDispatch = jest.fn();
      const actionToDispatch = setError(error)
      const mappedProps = mapDispatchToProps(mockDispatch)
      mappedProps.setError(error)
      expect(mockDispatch).toHaveBeenCalledWith(actionToDispatch)
    })
  })
})