import React from 'react';
import {Stats, mapDispatchToProps} from './Stats';
import { shallow } from 'enzyme';
import MockData from '../../Utilities/mockData.js'

let wrapper;
let mockTrails = MockData.mockTrails

describe('Stats', () => {
  beforeEach(() => {
    wrapper = shallow(
      <Stats trails={mockTrails} />
    )

  })
  describe('Component', () => {
    it('Should match snapshot',() => {
      expect(wrapper).toMatchSnapshot()
    })
  })
})