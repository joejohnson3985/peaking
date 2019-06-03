import React from 'react';
import { Results, mapStateToProps } from './Results';
import { shallow } from 'enzyme';

describe('Results', ()=> {

  describe('Component', () => {
    let wrapper;

    beforeEach(() => {
      wrapper = shallow(
        <Results />
      )
    })

    it('Should match the snapshot', () => {
      expect(wrapper).toMatchSnapshot()
    })
  })
})