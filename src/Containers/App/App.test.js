import App from './App';
import { shallow } from 'enzyme';
import React from 'react';


const store = jest.fn()
let wrapper;

describe('App', () => {
  it('Should match the snapshot', () => {
    wrapper = shallow(
      <App />
    )
    expect(wrapper).toMatchSnapshot()
  })
}) 