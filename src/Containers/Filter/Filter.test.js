import React from 'react';
import { shallow } from 'enzyme';
import { Filter, mapDispatchToProps } from './Filter';
import { setTrails, setLoading, setError } from '../../Actions';
import { getCurrentLocationName, getSearchedTrails, getTrails } from '../../APICalls'

jest.mock('../../APICalls/index.js');
getCurrentLocationName.mockImplementation(() => Promise.resolve(1));
getSearchedTrails.mockImplementation(() => Promise.resolve(1));
getTrails.mockImplementation(() => Promise.resolve(1));

let wrapper;
let expected;
let result;
let mockSetLoading;
let mockSetError;
let mockPos;
let mockEvent;
let mockAddress1 = {address: 'Whittier, Denver, CO 80205, USA', types:['political']}
let mockAddress2 = {address: '2445 N Gaylord Street, Denver, CO, 80205', types:['street address']}
let mockAddresses = [mockAddress1, mockAddress2]
let mockPositionError = {message: 'mock error message'}
let mockFilter = {
        search:'Test',
        maxDistance: 20,
        lat: 0,
        lng: 0,
        sort: 'quality',
        minLength: 0,
        minStars: 0,
        maxResults: 20
      }


describe('Filter', () => {

  beforeEach(() => {
    mockSetLoading = jest.fn()
    mockSetError = jest.fn()
    wrapper= shallow(
      <Filter setLoading={mockSetLoading} setError={mockSetError} />
    )
  })

  describe('Component', () => {

    it('Should match the snapshot', () => {
      expect(wrapper).toMatchSnapshot();
    })

    it('should have a default state', () => {
      expected = {
        search:'',
        maxDistance: 20,
        lat: 0,
        lng: 0,
        sort: 'quality',
        minLength: 0,
        minStars: 0,
        maxResults: 20
      }
      expect(wrapper.state()).toEqual(expected)
    })
  })

  describe('Methods', () => {

    describe('getLocation', () => {
      it('Should call setLoading when when getLocation is invoked', () => {
        wrapper.instance().getLocation()
        expect(mockSetLoading).toHaveBeenCalledWith(true)
      })
    })

    describe('setCurrentLocation', () => {
      mockPos = {coords: {latitude: 39.7392358, longitude: -104.990251}}
      const { latitude, longitude } = mockPos.coords
      let expected = {lat: latitude, lng: longitude}

      it('Should call getCurrentLocationName with the correct params', () => {
        wrapper.instance().setCurrentLocation(mockPos)
        expect(getCurrentLocationName).toHaveBeenCalledWith(expected)
      })

      it('Should return an object with a type that includes political', () => {
        result = wrapper.instance().findLocalAddress(mockAddresses)
        expect(result).toEqual(mockAddress1)
      })
    })

    describe('errorLocating', () => {

      it('Should call the function setError with correct params when invoked', () => {
        let expectedError = 'mock error message. Default location is Denver, Colarado.'
        wrapper.instance().errorLocating(mockPositionError)
        expect(mockSetError).toHaveBeenCalledWith(expectedError)
      })

      it.skip('Should call the function setCurrentLocation when invoked', () => {
        mockPos = {coords: {latitude: 39.7392358, longitude: -104.990251}}
        wrapper.instance().errorLocating(mockPositionError)
        expect(wrapper.setCurrentLocation).toHaveBeenCalledWith(mockPos)
      })
    })

    describe('handleChange', () => {
      it('Should set state when invoked', () => {
        mockEvent = {target: {name: 'maxDistance', value: 30}}
        expect(wrapper.state().maxDistance).toEqual(20)
        wrapper.instance().handleChange(mockEvent)
        expect(wrapper.state().maxDistance).toEqual(30)
      })
    })

    describe('handleSearch', () => {
      it('Should call getSearchedTrails with the correct params', () => {
        wrapper.state().search = 'test search'
        wrapper.instance().handleSearch()
        expect(getSearchedTrails).toHaveBeenCalledWith('test search')
      })
    })

    describe('handleSubmit', () => {
      it('Should call getTrails with correct params', () => {
        wrapper.state().search = 'Test'
        wrapper.instance().handleSubmit()
        expect(getTrails).toHaveBeenCalledWith(mockFilter)
      })
    })

    
  })

  describe('mapDispatchToProps', () => {
    it('Should call setTrails with correct params', () => {
      let mockTrails = [{number: 1}, {number: 2}]
      const mockDispatch = jest.fn();
      const actionToDispatch = setTrails(mockTrails)
      const mappedProps = mapDispatchToProps(mockDispatch)
      mappedProps.setTrails(mockTrails)
      expect(mockDispatch).toHaveBeenCalledWith(actionToDispatch)
    })

    it('Should call setError with correct params', () => {
      let mockError = 'error'
      const mockDispatch = jest.fn();
      const actionToDispatch = setError(mockError)
      const mappedProps = mapDispatchToProps(mockDispatch)
      mappedProps.setError(mockError)
      expect(mockDispatch).toHaveBeenCalledWith(actionToDispatch)
    })

    it('Should call setLoading with correct params', () => {
      let mockBool = true
      const mockDispatch = jest.fn();
      const actionToDispatch = setLoading(mockBool)
      const mappedProps = mapDispatchToProps(mockDispatch)
      mappedProps.setLoading(mockBool)
      expect(mockDispatch).toHaveBeenCalledWith(actionToDispatch)
    })  })
})