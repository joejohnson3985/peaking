import React from 'react';
import { getMyHikes} from '../../APICalls'
import { shallow } from 'enzyme';
import {ExpandedTrail} from './ExpandedTrail';

describe('ExpandedTrail', () => {
  let wrapper;
  let expected;
  let mockMatch = {params:{id: 7000130}}

  beforeEach(() => {
    wrapper= shallow(
      <ExpandedTrail match={mockMatch}/>
    )
  })

  describe('Component', () => {

    it('Should match the snapshot', () => {
      expect(wrapper).toMatchSnapshot();
    })

    it('should have a default state', () => {
      expected = {trail: {}}
      expect(wrapper.state()).toEqual(expected)
    })
  })
})