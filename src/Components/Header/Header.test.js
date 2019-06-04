import React from 'react';
import {Header, mapDispatchToProps} from './Header';
import { shallow } from 'enzyme';
import { setTrails } from '../../Actions';
import { getMyHikes } from '../../APICalls'


describe('Header', () => {

  let wrapper;
  let mockTrails = [
      {
        "id": 7000130,
        "name": "Bear Peak Out and Back",
        "type": "Featured Hike",
        "summary": "A must-do hike for Boulder locals and visitors alike!",
        "difficulty": "blueBlack",
        "stars": 4.6,
        "starVotes": 94,
        "location": "Boulder, Colorado",
        "url": "https://www.hikingproject.com/trail/7000130/bear-peak-out-and-back",
        "imgSqSmall": "https://cdn-files.apstatic.com/hike/7005382_sqsmall_1554312030.jpg",
        "imgSmall": "https://cdn-files.apstatic.com/hike/7005382_small_1554312030.jpg",
        "imgSmallMed": "https://cdn-files.apstatic.com/hike/7005382_smallMed_1554312030.jpg",
        "imgMedium": "https://cdn-files.apstatic.com/hike/7005382_medium_1554312030.jpg",
        "length": 5.7,
        "ascent": 2541,
        "descent": -2540,
        "high": 8342,
        "low": 6103,
        "longitude": -105.2755,
        "latitude": 39.9787,
        "conditionStatus": "All Clear",
        "conditionDetails": "Mostly Dry: All dry. A few places of the hike have small streams flowing through the path but nothing too extreme. Rain = mud tho.  ",
        "conditionDate": "2019-06-04 13:38:04",
        "hiked": true,
        "hikeLater": false
      },
      {
        "id": 7004226,
        "name": "Sunshine Lion's Lair Loop",
        "type": "Featured Hike",
        "summary": "Great Mount Sanitas views are the reward for this gentler loop in Sunshine Canyon.",
        "difficulty": "blue",
        "stars": 4.5,
        "starVotes": 95,
        "location": "Boulder, Colorado",
        "url": "https://www.hikingproject.com/trail/7004226/sunshine-lions-lair-loop",
        "imgSqSmall": "https://cdn-files.apstatic.com/hike/7039883_sqsmall_1555092747.jpg",
        "imgSmall": "https://cdn-files.apstatic.com/hike/7039883_small_1555092747.jpg",
        "imgSmallMed": "https://cdn-files.apstatic.com/hike/7039883_smallMed_1555092747.jpg",
        "imgMedium": "https://cdn-files.apstatic.com/hike/7039883_medium_1555092747.jpg",
        "length": 5.3,
        "ascent": 1261,
        "descent": -1282,
        "high": 6800,
        "low": 5530,
        "longitude": -105.2979,
        "latitude": 40.02,
        "conditionStatus": "All Clear",
        "conditionDetails": "A little wet in places but clear overall",
        "conditionDate": "2019-05-29 12:06:52",
        "hiked": false,
        "hikeLater": true
      }
    ]
  beforeEach(() => {
    wrapper = shallow(
      <Header />
    )
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
    let ids, mockSetTrails
    beforeEach(() => {
      ids = [7000130, 7004226]
      mockSetTrails = jest.fn()
      wrapper = shallow(
        <Header setTrails={mockTrails}/>
      )
    })

    it.skip('Should call getMyHikes when getTrails is called', () => {
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