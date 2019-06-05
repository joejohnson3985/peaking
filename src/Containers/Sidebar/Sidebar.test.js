import Sidebar from './Sidebar';
import { shallow } from 'enzyme';
import React from 'react';


const store = jest.fn()
let wrapper;

describe('Sidebar', () => {

  beforeEach(() => {
    wrapper = shallow(
      <Sidebar />
    )
  })
  it('Should match the snapshot when showNav is false', () => {
    expect(wrapper.state().showNav).toEqual(false)
    expect(wrapper).toMatchSnapshot()
  })

  it('Should match the snapshot when showNav is true', () => {
    wrapper.state().showNav = true
    expect(wrapper.state().showNav).toEqual(true)
    expect(wrapper).toMatchSnapshot()
  })

  it('Should have default state', () => {
    expect(wrapper.state()).toEqual({showNav: false})
  })

  it('Should call showSidebar on click of find hikes and update state', () => {
    expect(wrapper.state().showNav).toEqual(false)
    jest.spyOn(wrapper.instance(), 'showSidebar')
    wrapper.find('.find-hikes-link').simulate('click')
    expect(wrapper.instance().showSidebar).toHaveBeenCalled()
    expect(wrapper.state().showNav).toEqual(true)
  })

  it('Should call showSidebar on click of my hikes and update state', () => {
    expect(wrapper.state().showNav).toEqual(false)
    jest.spyOn(wrapper.instance(), 'showSidebar')
    wrapper.find('.my-hikes-link').simulate('click')
    expect(wrapper.instance().showSidebar).toHaveBeenCalled()
    expect(wrapper.state().showNav).toEqual(true)
  })

  it('Should call showSidebar on click of hamburger and update state', () => {
    expect(wrapper.state().showNav).toEqual(false)
    jest.spyOn(wrapper.instance(), 'showSidebar')
    wrapper.find('.hamburger-link').simulate('click')
    expect(wrapper.instance().showSidebar).toHaveBeenCalled()
    expect(wrapper.state().showNav).toEqual(true)
  })

  it('Should call showSidebar on click of the x and update state', () => {
    expect(wrapper.state().showNav).toEqual(false)
    jest.spyOn(wrapper.instance(), 'showSidebar')
    wrapper.find('.hamburger-link').simulate('click')
    expect(wrapper.instance().showSidebar).toHaveBeenCalled()
    expect(wrapper.state().showNav).toEqual(true)
  })

  it('Should toggle state when showSidebar is called', () => {
    expect(wrapper.state().showNav).toEqual(false)
    wrapper.instance().showSidebar()
    expect(wrapper.state().showNav).toEqual(true)
    wrapper.instance().showSidebar()
    wrapper.instance().showSidebar()
    wrapper.instance().showSidebar()
    expect(wrapper.state().showNav).toEqual(false)
    wrapper.instance().showSidebar()
    expect(wrapper.state().showNav).toEqual(true)
  })
}) 