import React from 'react';
import { shallow } from 'enzyme';
import { Filter, mapDispatchToProps } from './Filter';
import { setTrails, setLoading, setError } from '../../Actions';


describe('Filter', () => {
  let wrapper;
  let expected;

  beforeEach(() => {
    wrapper= shallow(
      <Filter setLoading={setLoading}/>
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
    describe('findLocalAddress', () => {
      let address1 = {address: 'Whittier, Denver, CO 80205, USA', types:['political']}
      let address2 = {address: '2445 N Gaylord Street, Denver, CO, 80205', types:['street address']}
      let addresses = [{address1}, {address2}]
      it('Should return an object with a type that includes political', () => {
        result = wrapper.instance().findLocalAddress(addresses)
        expect(result).toEqual(address1)
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