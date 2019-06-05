import React from 'react';
import {Header, mapDispatchToProps} from './Header';
import { shallow } from 'enzyme';
import { setTrails } from '../../Actions';
import { getMyHikes } from '../../APICalls/index.js'
import MockData from '../../Utilities/mockData.js'

jest.mock('../../APICalls/index.js');
getMyHikes.mockImplementation(() => Promise.resolve(1));

let mockResults = MockData.mockGetMyHikesResults
let mockTrails = MockData.mockTrails

let wrapper;
let mockSetTrails;


describe('Header', () => {
  beforeEach(() => {
    mockSetTrails = jest.fn()
    wrapper = shallow(
      <Header setTrails={mockSetTrails} results={mockResults}/>
    )
  })

  afterEach(() => {
    getMyHikes.mockClear()
  })

  describe('component', () => {

    it('Should match the snapshot when trails is empty', () => {
      expect(wrapper).toMatchSnapshot()
    })

    it('Should match the snapshot when trails has trails', () => {
      wrapper.state().trails = mockTrails
      expect(wrapper).toMatchSnapshot()
    })

    it('Should have a defualt state', () => {
      expect(wrapper.state()).toEqual({ids: [], trails: []})
    })
  })

  describe('methods', () => {
    beforeEach(() => {
      wrapper.state().trails = mockTrails
      expect(wrapper.state().ids).toEqual([])
    })

    it('Should set state of ids when getAllHikes is called', () => {
      wrapper.instance().getAllMyHikes()
      expect(wrapper.state().ids).toEqual([7000130, 7004226])
    })

    it('Should set state of ids when getHikedTrails is called', () => {
      wrapper.instance().getHikedTrails()
      expect(wrapper.state().ids).toEqual([7000130])
    })

    it('Should set state of ids when getAllHikes is called', () => {
      wrapper.instance().getFutureTrails()
      expect(wrapper.state().ids).toEqual([7004226])
    })
  })

  describe('getTrails', () => {

    it('Should call getMyHikes when getTrails is called',  () => {
      let ids = [7000130, 7004226]
      wrapper.instance().getTrails(ids)
      expect(getMyHikes).toHaveBeenCalledWith(ids)
    })
  })

  describe('mapDispatchToProps', () => {
    it('Should call setTrails with correct params', () => {
      const mockDispatch = jest.fn();
      const actionToDispatch = setTrails(mockTrails)
      const mappedProps = mapDispatchToProps(mockDispatch)
      mappedProps.setTrails(mockTrails)
      expect(mockDispatch).toHaveBeenCalledWith(actionToDispatch)
    })
  })
})