import * as actions from './'

describe('actions', () => {
  it('should create an action to set trails', () => {
    const trails = [];
    const expectedAction = {type: 'SET_TRAILS', trails}
    expect(actions.setTrails(trails)).toEqual(expectedAction);
  })

  it('should create an action to set loading status', () => {
    const bool = true;
    const expectedAction = {type: 'SET_LOADING', bool}
    expect(actions.setLoading(bool)).toEqual(expectedAction);
  })

  it('should create an action to error message', () => {
    const error = [];
    const expectedAction = {type: 'SET_ERROR', error}
    expect(actions.setError(error)).toEqual(expectedAction);
  })
})