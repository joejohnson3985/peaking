import Trail from './Trail';
import { shallow } from 'enzyme';
import React from 'react';
import MockData from '../../Utilities/mockData'


let wrapper;
let mockId = 7004226
let mockMyHike = MockData.myHike
let mockMyHikes = MockData.myHikes


describe('Trail', () => {

  beforeEach(() => {
    wrapper = shallow(
      <Trail id={mockId}/>
    )
  })
  it('Should match the snapshot when showNav is false', () => {
    expect(wrapper).toMatchSnapshot()
  })

  it('Should have defualt state', () => {
    expect(wrapper.state()).toEqual({ hikeLater: false, hiked: false, expand: {} })
  })

  describe('checkState', () => {
    it('Should be a function', () => {
      wrapper.instance().checkState(mockMyHike)
    })

    it('Should set state when trails exist', () => {
      expect(wrapper.state()).toEqual({ hikeLater: false, hiked: false, expand: {} })
      wrapper.instance().checkState(mockMyHike)
      expect(wrapper.state()).toEqual({ hikeLater: true, hiked: false, expand: {} })
    })

  })
  describe('updateMyHikes', () => {
    it.skip('Should add a new hike if it does not exist', () => {
      mockId = 7000130
      wrapper = shallow(
        <Trail id={mockId}/>
      )
      localStorage.setItem('myHikes', mockMyHikes)
      console.log(localStorage.myHikes.length)
      wrapper.state().hiked = true
      wrapper.state().hikeLater = false
      expect(localStorage.myHikes.length).toEqual(15)
      wrapper.instance().updateMyHikes()
      console.log(localStorage.myHikes.length)
      expect(localStorage.myHikes.length).toEqual(16)
    })
  })

  describe('handleHiked', () => {
    it('should be a function', () => {
      wrapper.instance().handleHiked()
    })

    it('Should set state', () => {
      expect(wrapper.state().hiked).toEqual(true)
      wrapper.instance().handleHiked()
      expect(wrapper.state().hiked).toEqual(false)

    })
  })

  describe('handleHikeLater', () => {
    it('should be a function', () => {
      wrapper.instance().handleHikeLater()
    })

    it('Should set state', () => {
      expect(wrapper.state().hikeLater).toEqual(true)
      wrapper.instance().handleHikeLater()
      expect(wrapper.state().hikeLater).toEqual(false)
    })
  })

  describe('displayChecks', () => {
    it('Should match snapshot if value is false', () => {
      wrapper.instance().displayChecks(false)
      expect(wrapper).toMatchSnapshot()
    })

    it('Should match snapshot if value is false', () => {
      wrapper.instance().displayChecks(true)
      expect(wrapper).toMatchSnapshot()
    })
  })

})